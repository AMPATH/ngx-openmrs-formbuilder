export class MockObs {
  constructor() {
    return this.getObs();
  }
  getObs(): any {
    // tslint:disable-next-line:max-line-length
    return {
      uuid: '5c894b08-42ed-4eca-94f5-62ef57853865',
      encounterDatetime: '2017-11-20T10:23:00.000+0300',
      patient: {
        uuid: 'dbb2f104-82f3-4fa9-aaaa-3b0ea908f936',
        identifiers: [
          {
            display: 'KENYAN NATIONAL ID NUMBER = 22551100',
            uuid: 'cae5f716-e7f0-4851-a348-7ed27be2cd28',
            identifier: '22551100',
            identifierType: {
              uuid: '58a47054-1359-11df-a1f1-0026b9348838',
              display: 'KENYAN NATIONAL ID NUMBER',
              links: [
                {
                  rel: 'self',
                  uri:
                    'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/patientidentifiertype/58a47054-1359-11df-a1f1-0026b9348838'
                }
              ]
            },
            location: {
              uuid: '08feb14c-1352-11df-a1f1-0026b9348838',
              display: 'Location-2',
              links: [
                {
                  rel: 'self',
                  uri:
                    'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/location/08feb14c-1352-11df-a1f1-0026b9348838'
                }
              ]
            },
            preferred: true,
            voided: false,
            links: [
              {
                rel: 'self',
                uri:
                  // tslint:disable-next-line:max-line-length
                  'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/patient/dbb2f104-82f3-4fa9-aaaa-3b0ea908f936/identifier/cae5f716-e7f0-4851-a348-7ed27be2cd28'
              },
              {
                rel: 'full',
                uri:
                  // tslint:disable-next-line:max-line-length
                  'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/patient/dbb2f104-82f3-4fa9-aaaa-3b0ea908f936/identifier/cae5f716-e7f0-4851-a348-7ed27be2cd28?v=full'
              }
            ],
            resourceVersion: '1.8'
          }
        ]
      },
      form: {
        uuid: 'f8322fde-6160-4e70-8b49-e266022f1108',
        name: 'AMPATH POC Transfer Out Form v0.01'
      },
      visit: {
        uuid: '53ce7340-cdac-4aad-ad1a-f5e0a211f41c',
        visitType: {
          uuid: 'dcdefd27-82b9-48e3-821b-3ffc6463564e',
          display: 'Resistance Clinic Visit',
          name: 'Resistance Clinic Visit',
          description: null,
          retired: false,
          links: [
            {
              rel: 'self',
              uri:
                'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/visittype/dcdefd27-82b9-48e3-821b-3ffc6463564e'
            },
            {
              rel: 'full',
              uri:
                'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/visittype/dcdefd27-82b9-48e3-821b-3ffc6463564e?v=full'
            }
          ],
          resourceVersion: '1.9'
        },
        display: 'Resistance Clinic Visit @ Location-1 - 21/09/2017 16:48',
        startDatetime: '2017-09-21T16:48:22.000+0300',
        stopDatetime: null
      },
      location: {
        uuid: '08feae7c-1352-11df-a1f1-0026b9348838',
        display: 'Location-1',
        links: [
          {
            rel: 'self',
            uri:
              'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/location/08feae7c-1352-11df-a1f1-0026b9348838'
          }
        ]
      },
      encounterType: {
        uuid: 'cbe2d31d-2201-44ce-b52e-fbd5dc7cff33',
        display: 'TRANSFERENCOUNTER',
        links: [
          {
            rel: 'self',
            uri:
              'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/encountertype/cbe2d31d-2201-44ce-b52e-fbd5dc7cff33'
          }
        ]
      },
      provider: {
        uuid: 'be0c0f0c-136e-4d9d-a63b-85f5c8348e91',
        display: 'Ampath Test',
        links: [
          {
            rel: 'self',
            uri:
              'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/person/be0c0f0c-136e-4d9d-a63b-85f5c8348e91'
          }
        ]
      },
      orders: [],
      obs: [
        {
          uuid: 'ff1776dd-012b-4213-acef-34a1ed30c6c1',
          obsDatetime: '2017-11-20T10:23:00.000+0300',
          concept: {
            uuid: '7c579743-5ef7-4e2c-839f-5b95597cb01c',
            name: { display: 'PATIENT CARE STATUS' }
          },
          value: {
            uuid: 'a89c2e5c-1350-11df-a1f1-0026b9348838',
            display: 'TRANSFER CARE TO OTHER CENTER',
            links: [
              {
                rel: 'self',
                uri:
                  'https://amrs.ampath.or.ke:8443/amrs/ws/rest/v1/concept/a89c2e5c-1350-11df-a1f1-0026b9348838'
              }
            ]
          },
          groupMembers: null
        },
        {
          uuid: '47c4ed3c-a498-4885-824f-30ba4bb9d140',
          obsDatetime: '2017-11-20T10:23:00.000+0300',
          concept: {
            uuid: '23f710cc-7f9c-4255-9b6b-c3e240215dba',
            name: { display: 'THERAPEUTIC PLAN NOTES' }
          },
          value: 'test',
          groupMembers: null
        }
      ]
    };
  }

  getExpected(): any {
    return {
      encounterDatetime: '2016-01-21T16:17:46.000+0300',
      location: '08feae7c-1352-11df-a1f1-0026b9348838',
      patient: 'patient-uuid',
      form: '1339a535-e38f-44cd-8cf8-f42f7c5f2ab7',
      encounterType: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
      provider: 'provider-uuid',
      'a8a666ba-1350-11df-a1f1-0026b9348838': '2016-02-26T00:00:00.000+0300',
      'a8afcafc-1350-11df-a1f1-0026b9348838': [
        'a8ad1276-1350-11df-a1f1-0026b9348838',
        'a8afc8b8-1350-11df-a1f1-0026b9348838'
      ],
      'a8a08344-1350-11df-a1f1-0026b9348838': [
        {
          'a899cf5e-1350-11df-a1f1-0026b9348838': [
            '3d587177-984e-4eeb-93f2-3223b6c1dd7c',
            'a8967656-1350-11df-a1f1-0026b9348838'
          ]
        }
      ],
      'a8afdb8c-1350-11df-a1f1-0026b9348838': [
        {
          'a899e444-1350-11df-a1f1-0026b9348838':
            'a8971c64-1350-11df-a1f1-0026b9348838',
          'a8a0744e-1350-11df-a1f1-0026b9348838': 600
        },
        {
          'a899e444-1350-11df-a1f1-0026b9348838':
            'a899f51a-1350-11df-a1f1-0026b9348838',
          'a8a07386-1350-11df-a1f1-0026b9348838': 2
        },
        {
          'a899e5f2-1350-11df-a1f1-0026b9348838': '2016-01-10T00:00:00.000+0300'
        }
      ],
      'a89c1fd4-1350-11df-a1f1-0026b9348838':
        'a89b77aa-1350-11df-a1f1-0026b9348838',
      '02ad9357-b996-4530-b1a4-aff91a105383':
        'a8afcc82-1350-11df-a1f1-0026b9348838',
      '2a4b87dd-977d-4ce8-a321-1f13df4a31b2': [
        {
          '479decbd-e964-41c3-9576-98b39089ebd3':
            'a8b0f882-1350-11df-a1f1-0026b9348838'
        }
      ],
      'a899e282-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a89b75d4-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a89ae254-1350-11df-a1f1-0026b9348838':
        'a899b42e-1350-11df-a1f1-0026b9348838',
      'a89b7e12-1350-11df-a1f1-0026b9348838':
        'a899e0ac-1350-11df-a1f1-0026b9348838',
      'a8afcc82-1350-11df-a1f1-0026b9348838':
        'a899b35c-1350-11df-a1f1-0026b9348838'
    };
  }
}
