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

- I recently used `ant-design` in my personal project which turned out pretty well. Hence, to learn more about it I have used it in this project too. Please let me know if it was ok to do so. I can work comfortably with native elements also.

- Tested on latest version of Safari, Brave, Edge and Chrome in MacOs and iPadOS.