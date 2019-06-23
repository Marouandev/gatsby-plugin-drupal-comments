# gatsby-plugin-drupal-comments
This Gatsby Plugin is for embedding drupal comment form.

This plugin require [Drupal JSONAPI module](https://www.drupal.org/project/jsonapi) installed.

# Installation
npm install gatsby-plugin-drupal-comments --save

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
