# Online Staken - server

De code aan de server kant van de online staken tool.

Om deze code te gebruiken moet config.php aangemaakt worden in deze map, met de volgende inhoud:

```php
<?php

return array(
    'servername' => "XXX", // mysql host
    'database' => "XXX", // mysql database
    'username' => "XXX", // mysql database username
    'password' => "XXX", // mysql database password
    'userpassword' => "XXX", // secret password to access 'admin' pages
);
```
