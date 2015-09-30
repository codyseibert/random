-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 13, 2014 at 08:30 PM
-- Server version: 5.5.40-36.1-log
-- PHP Version: 5.4.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `codyseib_blog_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE IF NOT EXISTS `about` (
`id` int(11) NOT NULL,
  `html` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `html`) VALUES
(1, '<div style="text-align: center;"><img src="images/cody.jpg" style="border-radius: 50%; width: 200px;">\n<br>\n<br>\nI''m Cody Seibert and this is my personal project and blog site!\n</div>\n<br>\n<div style="text-align: center;">\n<a href="files/Resume_Of_Cody_Seibert.pdf"  target="_blank"><img style="width: 50px;" src="images/pdf.png"> resume.pdf</a>\n</div>\n<br><br>\n\nThis site is a way for me to keep track of the various projects I have worked on in the past and the new projects I continue to work on in the future.  Additionally, I  wanted a site to post any of my random blog entries.  \n<br><br>\nI graduated from UCF with a Bachelors of Science in Computer Science May 2nd, 2013.  Shortly after, I started working as a software engineer at Harris Corporation in Melbourne, FL.  Using the knowledge obtained, I am now pursuing other endeavors as I search for a job more honed towards my area of interested: web development.\n<br><br>\nWhen I am not spending my time programming, I am usually doing one of the many other things I enjoy such as rock climbing, playing piano, drawing, or making music in my home town of Oviedo, FL.');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
`id` int(11) NOT NULL,
  `html` text NOT NULL,
  `title` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `html`, `title`, `date`) VALUES
(1, 'The majority of my day has been concentrated on redesigning and rebuilding my project / blog site in Angular.  This new site is custom, that is the back and front end is written from scratch instead of using a backing CMS like drupal or wordpress.  The content of this site is stored in a MySQL database (mainly choosen since that is already easily provided by my web host), and it uses a REST service written in PHP (using the Slim framework).  If my host provided Node.js or MongoDB, I would have probably tried redesigning it with those in mind.', 'Make it in Angular!', '2014-11-10 21:47:46'),
(3, 'Today I spent time designing designing a decent way to present the projects I have worked on on a top level view.  I came up with the idea for a simple title-image scheme to keep it minimal.  Additional information can be found on projects by clicking on the project boxes.  All of this information is currently stored in the database, but I think I will need to figure out a more elegant solution for creating templates for the projects page.\r\n<br><Br>\r\nThere is still some more work left to do: \r\n<ul>\r\n<li>Redesign navigation bar</li>\r\n<li>Add remaining projects</li>\r\n<li>Redesign the style of the content of the project page (I don''t like the content displayed over the background)</li>\r\n<li>Change the Title</li>\r\n<li>Reread text on About page</li>\r\n<li>Make it mobile friendly</li>\r\n<li>Upload site to GitHub</li>\r\n<li>The date on a news post needs to be fixed</li>\r\n<li>Order posts by date desc</li>\r\n<li>Add order to projects</li>\r\n<li>Create simple CMS for editing the HTML</li>\r\n</ul>', 'Added the Projects', '2014-11-13 07:14:32'),
(4, 'asdfasdf', 'Changing some stuff', '2014-11-13 23:21:49'),
(5, 'test', 'hihihihi', '2014-11-13 23:22:01'),
(6, 'asdfasdf', 'asdf', '2014-11-13 22:04:23'),
(7, 'zzzz', 'zzzz', '2014-11-13 22:05:20'),
(8, 'www', 'www', '2014-11-13 22:06:36');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
`id` int(11) NOT NULL,
  `title` text NOT NULL,
  `img` text NOT NULL,
  `html` text NOT NULL,
  `type` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `img`, `html`, `type`) VALUES
(51, 'CodySeibert.com', 'images/programming/mysite.png', '<div class="goodies">     <div class="center">         <span class="title">CodySeibert.com</span>         <br><br>         <img src="images/programming/mysite.png" class="small">         <br><br>     </div>      <b>Description</b>:<br>I have always wanted to start a blog.  Additionally, I think it is necessary for software engineers to keep a portfolio of their projects.  I decided to make CodySeibert.com a hybrid between a portfolio and a blog; the design I am going for should allow me to easily customize my project pages and blog posts.      <br><br>Each of my projects has its own page which the raw HTML can be edited as needed.  Since every projects I work on is different, I wanted the flexability to make each project page as unique as possible.  As of right now, there is a lot of raw HTML being stored into the database.  This may change if I settle for a general display or layout which all of my projects follow. As of right now, I can''t forsee that the diversity of the projects or activies I do (programming, music, art, etc), have much in common.     <br><br><br>     <b>Technologies Used</b>:     <br>Angular.js     <br>php     <br>Slim     <br>Git     <br>PhpMyAdmin     <br>Gimp     <br><br><br>     <a href="https://github.com/codyseibert/codyseibert" target="_blank"><img src="images/github.png" class="github"> GitHub</a> </div>', 'programming'),
(2, 'Alucard', 'images/art/alucard_sketch.jpg', '<img src="images/art/alucard_sketch.jpg">', 'art'),
(5, 'Find Your Way - Final Fantasy VIII Piano Collections', 'images/music/find_your_way.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/vFdQC7B5qRM?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(52, 'Flash Cards', 'images/programming/flash_cards.png', '<div class="goodies">     <div class="center">         <span class="title">Flash Cards</span>         <br><br>         <img src="images/programming/flash_cards.png" class="small">         <br><br>     </div>      <b>Description</b>:<br>This web application was created for a way to easily create new flash cards for memorizing whatever.  The idea was originally created so that I could try to memorize the names of all the people at the climbing gym I go to, but unfortunatley I never got around to doing so.  Regardless, this application is very generic and can be easily expanded to allow users to create their own records of flash cards they need to memorize.  This could even later be expanded to allow people to share their sets of cards with others.  This was the second application I created trying to learn Angular.       <br><br>     <b>Technologies Used</b>:     <br>Angular      <br>php     <br>Slim      <br>MySQL      <br><br><br>      <a href="https://github.com/codyseibert/flash-cards" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/flash_cards/#/" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(53, 'The Infinite Maze', 'images/programming/maze_snake.png', '<div class="goodies">     <div class="center">         <span class="title">Infinite Maze</span>         <br><br>         <img src="images/programming/maze_snake.png" class="small">         <br><br>     </div>      <b>Description</b>:<br>This is an "Itch Scratcher" project created to test out a simple concept that came to my mind.  This project infinitly generates an ever expanding maze using breadth-first-search on a fixed grid.  Turn on your best progressive house and watch it for hours (no really, test it out and see if it crashes, because I sure haven''t) =P     <br><br>     <b>Technologies Used</b>:     <br>HTML5       <br><br><br>      <a href="https://github.com/codyseibert/maze-snake" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/maze_snake" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(54, '3D CSS Ring', 'images/programming/div_ring.png', '<div class="goodies">     <div class="center">         <span class="title">3D Ring of Divs</span>         <br><br>         <img src="images/programming/div_ring.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     This is an "Itch Scratcher" project created to test out a simple concept that came to my mind.     <br><br>     This proof of concept was to test out simulating a 3D ring by simply changing the size of the divs and z-index of their css based on where they reside on one of the paths of a sphere.     <br><br>     The arrow keys allow the user to cycle through the selection of the div dom elements.  This could easily be expaned to form an unique type of user interface which would allow users to cycle through a list of items, for instance, maybe someones shopping cart.     <br><br>     <b>Technologies Used</b>:     <br>HTML5       <br><br><br>      <a href="https://github.com/codyseibert/3d-div-ring" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/3d_ring" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(55, 'Zombie Walkers', 'images/programming/zombie_walker.png', '<div class="goodies">     <div class="center">         <span class="title">Zombie Walkers</span>         <br><br>         <img src="images/programming/zombie_walker.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     Zombie Walkers was a project I started up to investigate Three.js, a 3D javascript library.  Additionally, I wanted to learn a little more about AI.  There is no objective inside this simulation.  The user can control the player using W,A,S,D and rotate him using the mouse.       <br><br>     I created both the zombie and barricade models and their textures using Blender and GIMP (hince why they look so bad =P).  The zombies use a path finding algorithm to traverse over the paths which connect the nodes (the white spheres) in order to reach the player.  Stand still long enough and the zombies will all swarm into the same location of your player.     <br><br>     This project also taught me a little bit about 3D objects and collisions.  If I remember correctly, the computation for collision uses the "oriented bounding box" formula.      <br><br>     Sometimes the project fails to load.  Usually refreshing the browser fixes that issue.  (I think it just freezes up downloading the model files and textures).     <br><br>     <b>Technologies Used</b>:     <br>HTML5     <br>Three.js     <br><br><br>      <a href="https://github.com/codyseibert/3d-zombie-walker" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/zombie_walker" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(56, 'Rocket Launch', 'images/programming/rocket_launch.png', '<div class="goodies">     <div class="center">         <span class="title">Rocket Launch</span>         <br><br>         <img src="images/programming/rocket_launch.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     This is an "Itch Scratcher" project created to test out a simple concept that came to my mind.      <br><br>     I attempted to get my friends interested in HTML5 development.  This project was that attempt.  I wanted to show them how simple it was to use jQuery to do interesting manipulation of the DOM tree.       <br><Br>     Rockets are spawned at a set interval time at the bottom of the screen and update at a random angle at a constant velocity upwards.  This project only uses CSS.  The HTML5 canvas element was not used for rendering.     <br><br>     I thought it was a neat little project.      <br><br>     <b>Technologies Used</b>:     <br>HTML5     <br>jQuery     <br><br><br>      <a href="https://github.com/codyseibert/rocket-launch" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/rocket_launch" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(57, 'Hodor Rain', 'images/programming/hodor_rain.png', '<div class="goodies">     <div class="center">         <span class="title">Hodor Rain</span>         <br><br>         <img src="images/programming/hodor_rain.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     This is an "Itch Scratcher" project created to test out a simple concept that came to my mind.      <br><br>     I wanted to simulate the matrix binary rain in HTML5, but instead I put my own twist onto it by making it rain "HODOR".  I mean, who doesn''t love Game of Throne?       <br><br>     <b>Technologies Used</b>:     <br>HTML5     <br>jQuery     <br><br><br>      <a href="https://github.com/codyseibert/hodor-rain" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/hodor_rain" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(58, 'Whiteboard', 'images/programming/whiteboard.png', '<div class="goodies">     <div class="center">         <span class="title">Whiteboard</span>         <br><br>         <img src="images/programming/whiteboard.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     This is an "Itch Scratcher" project created to test out a simple concept that came to my mind.      <br><br>     By clicking and holding the mouse, the user can draw lines on the canvas.  On the press of the mouse, a new line is started and not finished until the release of the mouse.  I ultimatley wanted to make this into an application where users could draw on one giant canvas whatever they wanted.       <br><br>     <b>Technologies Used</b>:     <br>HTML5     <br>jQuery     <br><br><br>      <a href="https://github.com/codyseibert/whiteboard" target="_blank"><img src="images/github.png" class="github"> GitHub</a>     <br>     <a href="http://codyseibert.com/b/demo/whiteboard" target="_blank"><img src="images/gears.png" class="github"> Demo</a> </div>', 'programming'),
(59, 'NN Stock Trainer', 'images/programming/nnstock.png', '<div class="goodies">     <div class="center">         <span class="title">NN Stock Trainer</span>         <br><br>         <img src="images/programming/nnstock.png" class="small">         <br><br>     </div>      <b>Description</b>:     <br>     This was a larger project I worked on for downloading stock prices from YAHOO, storing them in a MySQL database, run distributed neural network training using that data utilizing the various old computers I had laying around my house, and ultimatley predicting stock prices for the future 5 days.     <br><br>     This project works in a couple of steps.  The first part of the application is the downloader which downloads unseen days from YAHOO''s stock history API.  Yahoo allows the export of .CSV files of their stock history; therefore, this downloader parses those files to extract the data and insert them into a MySQL database.     <br><br>     The second part of the project is the training.  On various machines, the training service is constantly running listening for "train" messages off a load balanced queue in an ActiveMQ broker (JMS).  Once it obtains one, it will start training, and once done, it will publish a "result" message to another queue which the stock writer service is listening to to write the results to the MySQL database.     <br><br>     The final part of this project consisted of the predicting service.  This service listened onto a "predict" queue.  Once it receives a "predict" message, it will use the historial stock data from the database and the parameters of the trained neural network to try and predict the future stock prices.     <br><br>     This never actually ended up predicting stock prices accuraley, but created the system was a fun learning experience.     <br><br>     <b>Technologies Used</b>:     <br>Java     <br>ActiveMQ (JMS)     <br>MySQL     <br>OpenCSV (CSV Parsing Java Library)     <br>Encog (Neural Network Java Library)     <br><br><br>      <a href="https://github.com/codyseibert/NNStockTrainer" target="_blank"><img src="images/github.png" class="github"> GitHub</a>  </div>', 'programming'),
(9, 'Rooster', 'images/art/rooster_sketch.jpg', '<img src="images/art/rooster_sketch.jpg">', 'art'),
(10, 'Fallout 3', 'images/art/fallout_sketch.jpg', '<img src="images/art/fallout_sketch.jpg">', 'art'),
(11, 'Alien', 'images/art/alien_sketch.jpg', '<img src="images/art/alien_sketch.jpg">', 'art'),
(12, 'Baneling', 'images/art/baneling_sketch.jpg', '<img src="images/art/baneling_sketch.jpg">', 'art'),
(13, 'Butterfly', 'images/art/butterfly_mm.jpg', '<img src="images/art/butterfly_mm.jpg">', 'art'),
(14, 'Charlotte', 'images/art/charlotte_sketch.jpg', '<img src="images/art/charlotte_sketch.jpg">', 'art'),
(15, 'Chattanooga Art Museum', 'images/art/chatty_sketch.jpg', '<img src="images/art/chatty_sketch.jpg">', 'art'),
(16, 'Elite', 'images/art/elite_sketch.jpg', '<img src="images/art/elite_sketch.jpg">', 'art'),
(17, 'Eye #1', 'images/art/eye_sketch.jpg', '<img src="images/art/eye_sketch.jpg">', 'art'),
(18, 'Hei', 'images/art/hei_sketch.jpg', '<img src="images/art/hei_sketch.jpg">', 'art'),
(19, 'Hell Knight', 'images/art/hellknight_sketch.jpg', '<img src="images/art/hellknight_sketch.jpg">', 'art'),
(20, 'Horse', 'images/art/horse_sketch.jpg', '<img src="images/art/horse_sketch.jpg">', 'art'),
(21, 'Hydralisk', 'images/art/hydralisk_sketch.jpg', '<img src="images/art/hydralisk_sketch.jpg">', 'art'),
(22, 'Isaac, Dead Space', 'images/art/isaac_cp.jpg', '<img src="images/art/isaac_cp.jpg">', 'art'),
(23, 'Joker', 'images/art/joker_sketch.jpg', '<img src="images/art/joker_sketch.jpg">', 'art'),
(24, 'Kick-Ass', 'images/art/kickass_sketch.jpg', '<img src="images/art/kickass_sketch.jpg">', 'art'),
(25, 'Lightning, FF XIII', 'images/art/lightning_sketch.jpg', '<img src="images/art/lightning_sketch.jpg">', 'art'),
(26, 'Majora''s Mask', 'images/art/mask_cp.jpg', '<img src="images/art/mask_cp.jpg">', 'art'),
(27, 'Megaman', 'images/art/megaman_cp.jpg', '<img src="images/art/megaman_cp.jpg">', 'art'),
(28, 'Orc, Warcraft 3', 'images/art/orc_sketch.jpg', '<img src="images/art/orc_sketch.jpg">', 'art'),
(29, 'Skull', 'images/art/skull_sketch.jpg', '<img src="images/art/skull_sketch.jpg">', 'art'),
(30, 'Slasher, Dead Space', 'images/art/slasher_da.jpg', '<img src="images/art/slasher_da.jpg">', 'art'),
(31, 'Stalker, Dead Space', 'images/art/stalker_ds_sketch.jpg', '<img src="images/art/stalker_ds_sketch.jpg">', 'art'),
(32, 'Strider', 'images/art/strider_sketch.jpg', '<img src="images/art/strider_sketch.jpg">', 'art'),
(33, 'Sunflower', 'images/art/sunflower_sketch.jpg', '<img src="images/art/sunflower_sketch.jpg">', 'art'),
(34, 'Tank, L4D', 'images/art/tank_sketch.jpg', '<img src="images/art/tank_sketch.jpg">', 'art'),
(35, 'Tychus, Starcraft 2', 'images/art/tychus_sketch.jpg', '<img src="images/art/tychus_sketch.jpg">', 'art'),
(36, 'Ultralisk', 'images/art/ultralisk_sketch.jpg', '<img src="images/art/ultralisk_sketch.jpg">', 'art'),
(37, 'V for Vendetta', 'images/art/v_mm.jpg', '<img src="images/art/v_mm.jpg">', 'art'),
(38, 'Christopher Walken', 'images/art/walken_sketch.jpg', '<img src="images/art/walken_sketch.jpg">', 'art'),
(39, 'Zombie, Half Life', 'images/art/zombie_sketch.jpg', '<img src="images/art/zombie_sketch.jpg">', 'art'),
(40, 'To Zanarkand - Final Fantasy X Piano Collections', 'images/music/zanarkand.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/4U9RhvUpXnQ?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(41, 'Merry Christmas Mr. Lawrence', 'images/music/christmas.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/kQQjMnV33bo?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(42, 'Attack - Final Fantasy X Piano Collections', 'images/music/attack.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/U8afzMa_HLs?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(43, 'Besaid Island - Final Fantasy X Piano Collections', 'images/music/besaid.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/lAJCsE7M7V8?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(44, 'Via Purifico - Final Fantasy X Piano Collections', 'images/music/via_perfecto.jpg', '<iframe width="560" height="315" src="//www.youtube.com/embed/1Ni0KqYPZpo?list=UUsrVDPJBYeXItETFHG0qzyw" frameborder="0" allowfullscreen></iframe>', 'music'),
(45, 'The Forest of Pink', 'images/music/pink.jpg', '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/176519745&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', 'music'),
(46, 'Take Me Home', 'images/music/home.jpg', '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/176034805&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>', 'music'),
(47, 'AsteROIDS!', 'images/programming/asteroids.png', '<div class="goodies">     <div class="center">         <span class="title">AsteROIDS!</span>         <br><br>         <img src="images/programming/asteroids.png" class="small">         <br><br>     </div>      <b>Description</b>:<br>AsteROIDS! is a online multiplayer game which utilizes websockets for the client-server communications.  I started working on this project with my brother to investigate a variety of different technologies.  The goal is to get this game to a state in which the underlying code created for the game engine and build pipeline can be easily migrated to another game down the road if we decide to follow through with another game.     <br><br>     <b>Technologies Used</b>:     <br>Angular     <br>Node.js     <br>Socket.IO     <br>MongoDB     <br>Grunt     <br>Karma     <br>Jasmine     <br><br><br>     <a href="https://github.com/codyseibert/sidescroller" target="_blank"><img src="images/github.png" class="github"> GitHub</a> </div>', 'programming');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=60;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
