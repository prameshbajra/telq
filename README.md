# Telq

### To run this in your local machine:
```
ng serve -o
```

### To build for production:
```
ng build
```

### Some minor points:

- Since this is a small application, I have decided to use only one module, `app module`. However, for large applications where features are widely varying, I would always opt in to create multiple modules (on feature level) as lazy loading can be leveraged.

- All routes except `/` will redirected to `Home Page`.  A 404 page can also be created here.


