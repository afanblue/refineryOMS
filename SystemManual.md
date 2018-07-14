## System Manual

This document describes how the functionality provided was implemented (more or less)

## DB ERD

A (poorly organized) ERD for the DB is saved in the OMSV1.mwb (from MySQL Workbench) and OMSv1.pdf

### Page structure

Under the ui/src directory, 

---
-  ```frames``` - defines main page "frames" contents (header, classification (horizontal), and menu list (vertical) menus)
-  ```images``` - contains images used in pages (hint: there aren't many, not sure they're used, either.  The images displayed seem to be coming from ui/public/images)
-  ```js``` - (not used, though it has jquery.min.js)
-  ```mainpage``` - contains contents and login display
    - ```pages``` - contains (mostly) menu page handlers
        - ```displays``` - contains logic for the displays (forms & lists, mostly) for the menu pages.  Some of these pages actually do the display themselves w/o the need for a different list page.
            - ```forms``` - contains code to generate the forms for the admin pages
            - ```lists``` - contains code to generate the lists, mostly for the admin pages
            - ```objects``` - contains JavaScript objects to simplify data handling.  Could clearly add some functions to do stuff, but that's down the road for refactoring
        - ```requests``` - was originally intended to allow URI definitions for the various pages, but was deemed to add unncessary abstraction.
---

### Java REST program structure

This is all done w/Spring REST and myBatis.  That should be enough information.

---
-  the controllers are implemented in the ```oms``` project, ```it.avn.oms.rest.controller```
-  the myBatis sql Mappers are defined in the ```oms-shared``` project, ```src/main/resources/it.avn.oms.mapper```
-  the services are defined in the ```oms-shared``` project, ```src/main/java/it.avn.oms.service``` and implemented in the ```impl``` subdirectory of the services
---

### Adding a new page

Pages are viewable (i.e., appear in your menu list) based on privileges, which are assigned to roles, which are assigned to users.  There are two privileges associated w/a page, a "view" privilege and an "execute" privilege.  

There are two kinds of menus, "horizontal" and "vertical".  The vertical menus are sub-menus, i.e., when you select a particular horizontal menu item, the vertical menu changes.  when adding a page to a menu, you are adding an item to a vertical menu.  The horizontal menu in which your item is placed is specified by the category ID.  

Menu Type is specified in MENU_TYPE_VW
Category is specified by the Horizontal Item ID
 
   ---
   | Menu Item | Menu Type | Category (ID) |
   | :---: | :---: | :---: |
   | Horizontal Items | Horizontal | none (NULL) |
   | Vertical Items | Vertical | Horizontal Item (HzID) |
   ---


   1.  Add record(s) to the privilege table.  Note the record ID(s).
   
   1.  Get the record ID's for the roles you want to assign these privileges to.
   
   1.  Add record(s) to the ROLE_PRIV table.
   
   1.  Insert a record into the PAGE table.  The URI field is an artifact from the original PHP-based UI and can be ignored.
   
   1.  Insert a record into the MENU table.
   
   Now comes the hard part.  You need to add the code to handle the request.
   
   1.  In ui/src/mainpage/Contents.js add the appropriate imports for the page handlers.
   
   1.  In ui/src/mainpage/Contents.js add the handler in the appropriate locations.  In case it's not obvious, the logic is
   
   ---
       case: horizontal tab value
          case: vertical tab value
          
       where the tab values have the embedded blanks removed.
   ---
   
   1.  Add the various page handlers you've added references to.  The Page Structure definition above should provide hints to how it was originally implemented.
   
   1.  Create the necessary data retrieval functions in the Java rest app.
   
   
### Calculated Variables

Calculated variables are defined using multiple (up to 10) input variables (x0, x1 ... x9 ) and one output variable.  The output is an analog variable of analog type "calculated".  The input variables are analog variables and digital variables.

The calculation is defined using Reverse Polish (Post-fix) notation.  If you understand that these calculations are done with the arguments on a stack, it's easier to understand.  The value returned is the last value left on the stack.  So, if you do "4 3 dup +", then the value returned is 6, even though the 4 is still left on the stack.

Some examples are:

   ---
   | Example | Description |
   | :--- | :--- |
   | ```x0 32 - 5 * 9 /``` | Converts from Fahrenheit to Centigrade for value x0 [degC = (degF-32)*5/9] |
   | ```x0 40 + 5 * 9 / 40 -``` | Also converts from Fahrenheit to Centigrade [degC = (degF_40)*5/9 - 40] |
   | ```x0 9 * 5 / 32 +```   | Converts from Centigrade to Fahrenheit [degF = 9*degC/5 + 32]|
   | ```x0 40 + 9 * 5 / 40 -``` | Also converts from Centigrade to Fahrenheit [degF = (degC+40)*9/5 - 40]|
   ---
   
If the calculation fails, the value inserted in the output tag is -1001.

The operations supported are

   ---
   | Op Code | Operation | Example |
   | :--- | :--- | :--- |
   | + | addition | ```4 3 +``` = 7 |
   | - | subtraction | ```24 3 -``` = 21 |
   | * | multiplication | ```2 5 *``` = 10 |
   | / | division | ```24 3 /``` = 8 |
   | % | modulus | ```10 3 %``` = 1 |
   | ** | raised to the power | ```4 3 **``` = 64 |
   | pi | PI | ```pi``` = 3.14159... |
   | dup | duplicate value | ```4 dup +``` = 4 4 + = 8 |
   | swap | swap values on stack | ```4 3 swap **``` = 81 |
   | sin | sine (radians) | ```45 pi * 180 / sin``` = 0.707... |
   | cos | cosine (radians) | ```30 pi * 180 / cos``` = 0.866... |
   | tan | tangent (radians) | ```37 pi * 180 / tan``` = 0.753... |
   | log | log base 10 | ```2 log``` = 0.301... |
   | ln  | natural log | ```10 ln``` = 2.302... |
   | sqrt | square root | ```9 4 * sqrt``` = 6 |
   ---
   
### Outputs

The CONTROL_BLOCK is used as the mechanism for implementing outputs.  The fields as used by the simulator are

---
-   ```ID``` - ID for the input to the control block, i.e., the value to be "output".  This is either an analog input or a digital input
-   ```TAG_ID``` - the ID for the tag to be output.
-   ```BLOCK_TYPE``` - the type of algorithm to use to compute the output.  This field is currently ignored.  The null value will cause a direct write from the value of the input to the output.
---



   