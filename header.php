<?php
/**
 * The header template
 *
 *
 * @package AimHigher
 * @version 1.0
 */
?>
<html>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />

        <link href="/wp-content/themes/aimhigher/style.css?v=2020-04-18T02:13:32.581Z?v=2020-04-17T12:48:47.664Z?v=2020-04-17T09:43:06.792Z?v=2019-09-08T07:37:49.353Z?v=2019-09-06T13:50:05.364Z" rel="stylesheet" />
        
        <title>AimHigher</title>
        <meta name="description" content="WordPress Template" />

        <meta property="og:title" content="WordPress Template" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="WordPress Template" />

        <meta name="twitter:title" content="WordPress Template" />
        <meta name="twitter:description" content="WordPress Template" />
        <meta name="twitter:image" content="WordPress Template" />

        <?php wp_head(); ?>
    </head>

<body class="<?php if (is_front_page()) {
	echo 'home image-header';
} elseif (get_field('image_header')) {
	echo 'image-header';
} ?>">
    <header>
        <a href="/" class="site-logo">
            <?php
            $logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full')[0];
            echo file_get_contents($logo);
            ?>
        </a>



        <?php
        $hamburger =
        	get_site_url() . '/wp-content/themes/aimhigher/resources/img/hamburger_close.svg';
        $menu_toggle =
        	'<button class="hamburger" onClick="mobileMenu()">' .
        	file_get_contents($hamburger) .
        	'<span>Open Menu</span></button>';

        wp_nav_menu(array(
        	'theme_location' => 'main_menu',
        	'container' => 'nav',
        	'container_class' => 'menu main',
        	'items_wrap' => $menu_toggle . '<ul id="%1$s" data-test="true" class="%2$s">%3$s</ul>',
        ));
        ?>
    </header>

    <main  class="<?php if (is_front_page()) {
    	echo 'home';
    } ?>">
