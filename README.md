Views 2 remember
================

It started as a demo mobile web app for a talk. Later, *Views 2 remember* was left on google app engine while it was built around Instagram API. It's a mobile first web app that bring you *interesting* photos that you didn't follow on your private account. It's now fetching also: twitter (few great accounts), Flickr by tag and you can add your own twitter account you wish to see.
Its got an integration with [Pinterest](https://pinterest.com) - so you could save for later the photos that you really love.

### Demo
Live version at: http://views2remember.appspot.com/

### TODO
* Break the server side API to enable the client to drive the feeds.
* Use localStorage/IndexedDB to save the last photos + proxy the photos.
* Add post with explanations at: http://greenido.wordpress.com
* Add a 'slideshow' mode for kiosks.
  * https://github.com/dimsemenov/PhotoSwipe
  * 

![](http://ido-green.appspot.com/imgs/someone-busy-is-running.png)

Main Goal
=========
To built a mobile web app that give the user an interesting photos they didn't saw in the past.

Features
========
* Fetch the user tweets and 'create' a custom profile out of it.
* Allow integration with FB, yelp, G+ --> to help tune the profile.  
  * https://developers.google.com/+/api/
  * https://www.flickr.com/services/api/ and https://www.flickr.com/services/api/flickr.photos.search.html

* APIs 
  * [Instagram API](http://instagram.com/developer/endpoints/)
  * [Twitter API](https://dev.twitter.com/)

####Please feel free to fork or open issues.
