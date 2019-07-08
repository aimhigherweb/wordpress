<?php
    require_once(__DIR__ . '/functions/acf.php');

    // Define Nav Menus
    register_nav_menus(array (
        'main_menu' => 'Main Menu',
        'social_menu' => 'Social Menu',
    ));

    //Add Social Icons to Nav Menu
    add_filter('wp_nav_menu_objects', 'social_menu_icons', 10, 2);

    function social_menu_icons($items, $args) {
        if($args->theme_location == 'social_menu') {
            foreach($items as &$item) {
                $icon = file_get_contents(get_field('icon', $item));

                if($icon) {
                    $item->title = $icon . $item->title;
                }
            }

            return $items;
        }
        else {
            return $items;
        }
    }


    // Hide the widget titles
    add_filter('widget_title','my_widget_title'); 

    function my_widget_title($t) {
        return null;
    }

    //Upload logo to customise area
    function custom_logo_setup() {
        $defaults = array(
            'height'      => 50,
            'width'       => 120,
            'flex-height' => true,
            'flex-width'  => true,
        );
        add_theme_support( 'custom-logo', $defaults );
    }
    add_action( 'after_setup_theme', 'custom_logo_setup' );


    //Allow using SVGs
    // Allow SVG
    add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {
    
        global $wp_version;
        // if ( $wp_version !== '4.7.1' ) {
        //     return $data;
        // }
        
        $filetype = wp_check_filetype( $filename, $mimes );
        
        return [
            'ext'             => $filetype['ext'],
            'type'            => $filetype['type'],
            'proper_filename' => $data['proper_filename']
        ];
        
    }, 10, 4 );
    
    function cc_mime_types( $mimes ){
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
    add_filter( 'upload_mimes', 'cc_mime_types' );
    
    function fix_svg() {
        echo '<style type="text/css">
            .attachment-266x266, .thumbnail img {
                width: 100% !important;
                height: auto !important;
            }
            </style>';
    }
    add_action( 'admin_head', 'fix_svg' );

    //Stop Inlining width and height for images
    add_filter( 'post_thumbnail_html', 'remove_thumbnail_dimensions', 10 ); 
    add_filter( 'image_send_to_editor', 'remove_thumbnail_dimensions', 10 );
    function remove_thumbnail_dimensions( $html ) { 
        $html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html ); 
        return $html;
    }
?>