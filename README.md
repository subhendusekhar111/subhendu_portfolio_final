# My Portfolio Website

My Portfolio Website.

# Sections 📚

✔️ Summary and About me\
✔️ Skills \
✔️ Experience\
✔️ Projects\
✔️ Certifications 🏆\
✔️ Education\
✔️ Contact me

# Deployment 📦


We can trick Heroku into deploying our static site simply by adding one dynamic file.

I created a new file called index.php in the root directory, and write the following line in the file: <?php include_once("home.html"); ?> .

Next, I created a composer.json file in the root directory and write the following line in it: {} .

Because Heroku PHP Support will be applied to applications only when the application has a file named composer.json in the root directory. 

Even if an application has no Composer dependencies, it must include an empty composer.json in order to be recognized as a PHP application.

i had used this procedure as Heroku is a hosting platform where we can deploy dynamic applications in Rails, PHP, Node.js and Python.