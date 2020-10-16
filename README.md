# ng2-openmrs-formbuilder

This is a tool that builds OpenMRS Form Schemas interactively.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Install

### Using git

Run `git clone https://github.com/AMPATH/ng2-openmrs-formbuilder.git` to clone the repo locally.

Run `cd ng2-openmrs-formbuilder`

Run `npm install` to install dependencies.

Then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Using Dockerfile

Run `git clone https://github.com/AMPATH/ng2-openmrs-formbuilder.git` to clone the repo locally.

Run `docker build -t ng2-openmrs-formbuilder:1.2-alpha .` (don't forget the fullstop at the end)

Then `docker run -p 4200:80 ng2-openmrs-formbuilder:1.2-alpha`

### From Docker Hub

Run`docker run --rm -p 4200:80 fatmali/ng2-openmrs-formbuilder`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
