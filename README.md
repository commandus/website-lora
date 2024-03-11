# WebsiteLora

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Build & deploy web app

```
cd ~/src/angular/website-lora/
ng build
cd ~/src/angular/website-lora/dist/website-lora/browser/
scp -r * andrei@lora.commandus.com:/var/www/html/lora
```

## Notes

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


[Theming](https://material.angular.io/guide/theming)

[2](https://thecodeshewrites.com/2021/06/16/angular-material-dark-light-theme/#htoc-theme-management-with-angular-material)

# Test

```
wget -q -S -O - --post-data '["classes"]' http://localhost:8050/clause
wget -q -S -O - --post-data '["classes"]' https://lora.commandus.com/json/clause
```

1E246

Addr f123456789
Bin	11110	001001000110	100010101100111
Длина, бит	5	12	15
Hex	0	246	4567


{"addr": "f1234567", "netid": "800246", "type": 4, "id": "246", "nwkId": "246", "binary": "11110001001000110100010101100111","prefixlen": 5,"nwkidlen": 12,"addrlen": 15, "addrMin": "f2460000", "minbinary": "11110010010001100000000000000000","minprefixlen": 5,"minnwkidlen": 12,"minaddrlen": 15, "addrMax": "f2467fff", "maxbinary": "11110010010001100111111111111111","maxprefixlen": 5,"maxnwkidlen": 12,"maxaddrlen": 15}


```
wget -q -S -O - --post-data '["gw", "02bbe50000006cc3743eed467b227278706b223a5b7b22746d7374223a343032333131313534302c226368616e223a332c2272666368223a302c2266726571223a3836342e3730303030302c2273746174223a312c226d6f6475223a224c4f5241222c2264617472223a22534631324257313235222c22636f6472223a22342f35222c226c736e72223a2d31382e352c2272737369223a2d3132312c2273697a65223a33372c2264617461223a22514441445251474151774143334749312b374553394d697030356a436c6f536f464e367a634b65437877394d7357457634513d3d227d5d7d"]' https://lora.commandus.com/json/clause
```
