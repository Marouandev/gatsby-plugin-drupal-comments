# gatsby-plugin-drupal-comments
This Gatsby Plugin is for embedding drupal comment form.

This plugin require [Drupal JSONAPI module](https://www.drupal.org/project/jsonapi) installed.

# Installation
npm install gatsby-plugin-drupal-comments --save

# Demo
https://demo-gatsby-drupal-comments.netlify.com

# Usage
import DrupalComments from 'gatsby-plugin-drupal-comments';

        <DrupalComments
             entity_id = "drupal id node"
             type_comment = "comment"
             field_name = "comment"
             type_content = "type content" 
             entity_type = "type entity"
             url_api = "url json api comment : example.com/jsonapi/comment/comment"
             login_api = "username"
             password_api = "password"
        />
 # Result       
![comment-gatsbyjs-drupal](https://user-images.githubusercontent.com/6507511/60003450-0620f100-966b-11e9-9027-17d94501d764.png)
