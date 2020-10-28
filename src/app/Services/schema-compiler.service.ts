import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class FormSchemaCompiler {
  constructor() {}

  /**
   *
   *
   * @param {Object} formSchema
   * @param {Array<any>} referencedComponents
   * @returns {Object} formSchema
   *
   * @memberOf FormSchemaCompiler
   */
  public compileFormSchema(
    formSchema: Object,
    referencedComponents: Array<any>
  ): Object {
    // get all referenced forms
    const refForms: Object = this.getReferencedForms(
      formSchema,
      referencedComponents
    );
    if (_.isEmpty(refForms)) {
      return formSchema;
    }

    // get all place-holders from the form schema
    const placeHolders = this.getAllPlaceholderObjects(formSchema);
    if (_.isEmpty(placeHolders)) {
      return formSchema;
    }

    // replace all placeHolders
    this.replaceAllPlaceholdersWithActualObjects(refForms, placeHolders);
    return formSchema;
  }

  private findSchemaByName(
    schemaArray: Array<any>,
    nameOfSchema: string
  ): Object {
    if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
      return;
    }
    let foundSchema: any = {};
    _.each(schemaArray, (schema: any) => {
      if (schema.name === nameOfSchema) {
        foundSchema = schema;
      }
    });
    return foundSchema;
  }

  private getPageInSchemaByLabel(schema: any, pageLabel: string): Object {
    if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
      return;
    }
    let foundPage: Object = {};
    _.each(schema.pages, (page: any) => {
      if (page.label === pageLabel) {
        foundPage = page;
      }
    });
    return foundPage;
  }

  private getSectionInSchemaByPageLabelBySectionLabel(
    schema: Object,
    pageLabel: string,
    sectionLabel: string
  ): Object {
    if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
      return;
    }
    const foundPage: any = this.getPageInSchemaByLabel(schema, pageLabel);
    if (_.isEmpty(foundPage)) {
      return;
    }
    let foundSection: Object = {};
    _.each(foundPage.sections, (section: any) => {
      if (section.label === sectionLabel) {
        foundSection = section;
      }
    });
    return foundSection;
  }

  private getQuestionByIdInSchema(schema: any, questionId: string): Array<any> {
    if (_.isEmpty(schema) || _.isEmpty(questionId)) {
      return;
    }
    if (Array.isArray(schema)) {
      let question: Array<any>;
      for (let i = 0; i < schema.length; i++) {
        if (!_.isEmpty(schema[i])) {
          question = this.getQuestionByIdInSchema(schema[i], questionId);
        }
        if (!_.isEmpty(question)) {
          break;
        }
      }
      return question;
    } else if (typeof schema === 'object') {
      if (this.isQuestionObjectWithId(schema, questionId)) {
        return schema;
      } else if (this.isSchemaSubObjectExpandable(schema)) {
        const toExpand = schema.pages || schema.sections || schema.questions;
        return this.getQuestionByIdInSchema(toExpand, questionId);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  private getQuestionsArrayByQuestionIdInSchema(
    schema: any,
    questionId: string
  ): Array<any> {
    if (_.isEmpty(schema) || _.isEmpty(questionId)) {
      return;
    }
    return this.getQuestionsArrayByQuestionId(schema, schema, questionId);
  }

  private getQuestionsArrayByQuestionId(
    parent: any,
    object: any,
    questionId: string
  ): Array<any> {
    if (Array.isArray(object)) {
      let returnedValue: Array<any>;
      for (let i = 0; i < object.length; i++) {
        if (!_.isEmpty(object[i])) {
          returnedValue = this.getQuestionsArrayByQuestionId(
            object,
            object[i],
            questionId
          );
        }
        if (!_.isEmpty(returnedValue)) {
          break;
        }
      }

      return returnedValue;
    } else if (typeof object === 'object') {
      if (this.isQuestionObjectWithId(object, questionId)) {
        return parent;
      } else if (this.isSchemaSubObjectExpandable(object)) {
        const toExpand = object.pages || object.sections || object.questions;
        return this.getQuestionsArrayByQuestionId(
          toExpand,
          toExpand,
          questionId
        );
      } else {
        return;
      }
    } else {
      return;
    }
  }

  // object is page or section or question
  private isSchemaSubObjectExpandable(object: Object): Boolean {
    if (typeof object === 'object') {
      const objectKeys = Object.keys(object);
      if (
        _.includes(objectKeys, 'pages') ||
        _.includes(objectKeys, 'sections') ||
        _.includes(objectKeys, 'questions')
      ) {
        return true;
      }
    }
    return false;
  }

  private isQuestionObjectWithId(object: Object, id: any): Boolean {
    return object['id'] === id;
  }

  private getAllPlaceholderObjects(schema: Object): Array<any> {
    const referencedObjects: Array<any> = [];
    this.extractPlaceholderObjects(schema, referencedObjects);
    return referencedObjects;
  }

  private extractPlaceholderObjects(
    subSchema: any,
    objectsArray: Array<Object>
  ): void {
    if (_.isEmpty(subSchema)) {
      return;
    }
    if (Array.isArray(subSchema)) {
      for (let i = 0; i < subSchema.length; i++) {
        if (!_.isEmpty(subSchema[i])) {
          this.extractPlaceholderObjects(subSchema[i], objectsArray);
        }
      }
    } else if (typeof subSchema === 'object') {
      if (!_.isEmpty(subSchema.reference)) {
        objectsArray.push(subSchema);
      } else if (this.isSchemaSubObjectExpandable(subSchema)) {
        const toExpand =
          subSchema.pages || subSchema.sections || subSchema.questions;
        this.extractPlaceholderObjects(toExpand, objectsArray);
      }
    }
  }

  private fillPlaceholderObject(
    placeHolderObject: Object,
    referenceObject: Object
  ): Object {
    for (const member in referenceObject) {
      if (_.isEmpty(placeHolderObject[member])) {
        placeHolderObject[member] = referenceObject[member];
      }
    }
    return placeHolderObject;
  }

  private replaceAllPlaceholdersWithActualObjects(
    keyValReferencedForms: Object,
    placeHoldersArray: Array<any>
  ): Array<any> {
    _.each(placeHoldersArray, (placeHolder) => {
      const referencedObject: Object = this.getReferencedObject(
        placeHolder.reference,
        keyValReferencedForms
      );

      if (_.isEmpty(referencedObject)) {
        throw new Error(
          'Form compile: Error finding referenced object ' +
            JSON.stringify(placeHolder.reference)
        );
      } else {
        placeHolder = this.fillPlaceholderObject(placeHolder, referencedObject);
        placeHolder = this.removeExcludedQuestionsFromPlaceholder(placeHolder);
        delete placeHolder['reference'];
      }
    });
    return placeHoldersArray;
  }

  private removeObjectFromArray(array: Array<any>, object: Object): void {
    const indexOfObject = array.indexOf(object);
    if (indexOfObject === -1) {
      return;
    }

    array.splice(indexOfObject, 1);
  }

  private removeExcludedQuestionsFromPlaceholder(placeHolder: any): Object {
    if (Array.isArray(placeHolder.reference.excludeQuestions)) {
      _.each(placeHolder.reference.excludeQuestions, (excludedQuestionId) => {
        const questionsArray: Array<any> = this.getQuestionsArrayByQuestionIdInSchema(
          placeHolder,
          excludedQuestionId
        );

        if (!Array.isArray(questionsArray)) {
          return;
        }
        const question = this.getQuestionByIdInSchema(
          questionsArray,
          excludedQuestionId
        );

        this.removeObjectFromArray(questionsArray, question);
      });
    }
    return placeHolder;
  }

  private getReferencedObject(
    referenceData: any,
    keyValReferencedForms: Object
  ): Object {
    if (_.isEmpty(referenceData.form)) {
      throw new Error(
        'Form compile: reference missing form attribute ' + referenceData
      );
    }
    if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
      throw new Error(
        'Form compile: referenced form alias not found \n' +
          JSON.stringify(referenceData)
      );
    }
    if (!_.isEmpty(referenceData.questionId)) {
      return this.getQuestionByIdInSchema(
        keyValReferencedForms[referenceData.form],
        referenceData.questionId
      );
    }

    if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
      return this.getSectionInSchemaByPageLabelBySectionLabel(
        keyValReferencedForms[referenceData.form],
        referenceData.page,
        referenceData.section
      );
    }
    if (!_.isEmpty(referenceData.page)) {
      return this.getPageInSchemaByLabel(
        keyValReferencedForms[referenceData.form],
        referenceData.page
      );
    }
    throw new Error(
      'Form compile: Unsupported reference type \n' + referenceData.reference
    );
  }

  private getReferencedForms(
    formSchema: any,
    formSchemasLookupArray: Array<any>
  ): Object {
    const referencedForms: Array<any> = formSchema.referencedForms;
    console.log(referencedForms, formSchema, formSchemasLookupArray);
    if (_.isEmpty(referencedForms)) {
      return;
    }

    const keyValReferencedForms: Object = {};

    _.each(referencedForms, (reference: any) => {
      keyValReferencedForms[reference.alias] = this.findSchemaByName(
        formSchemasLookupArray,
        reference.formName
      );
    });
    return keyValReferencedForms;
  }
}
