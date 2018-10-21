# nodecamp
Project based on The Web Developer Bootcamp course.
## The Key Differences from the original course project
+ 3-tier architecture (Data - Application - Presentation instead of Data - Presentation):
  - ```model``` and ```service``` as Data tier: model contains Mongoose Schema, and service is an interface to access the data
  - ```controller``` as an Application tier: it contains application logic and permissions 
  - ```routes``` as a Presentation tier: defines entry points to the application - extracts received data from a request, calls controller's methods and renders a view.
  
+ Different login flow:
  - When user's trying to reach for secured endpoint the app saves original url and redirects to the login form. After successful authentication the app redirects back to the requested page
+ Handlebars instead of ejs
+ ### REST API
  - get all, get by id and post campground
  - JWT authentication
