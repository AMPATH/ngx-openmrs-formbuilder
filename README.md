# ng2-openmrs-formbuilder

This is a tool that builds OpenMRS Form Schemas interactively.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Development

Run `git clone https://github.com/AMPATH/ng2-openmrs-formbuilder.git` to clone the repo locally.

Run `cd ng2-openmrs-formbuilder`

Run `npm install` to install dependencies.

Setup environment variables

`export OPENMRS_HOST_URL=http://172.17.0.1`

`export OPENMRS_SECURE=false`

`http://172.17.0.1` is the openmrs host being served by docker on linux. This could be different on Mac

For example you could set this to a remote server `export OPENMRS_HOST_URL=https://openmrs-spa.org` since this is a secure host set `export OPENMRS_SECURE=true`

Then `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Setting up with docker

#### Prerequisites

- (docker)[https://docs.docker.com/engine/install/]
- (docker-compose)[https://docs.docker.com/compose/install/]

Run `git clone https://github.com/AMPATH/ng2-openmrs-formbuilder.git` to clone the repo locally.

Run `docker build -t ng2-openmrs-formbuilder .` (don't forget the fullstop at the end)

Run `export OPENMRS_HOST_URL=http://172.17.0.1`

Then `docker-compose up`

Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
