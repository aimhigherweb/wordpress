<?php
/**
 * The main template file
 *
 *
 * @package AimHigher
 * @version 1.0
 */

    if(is_front_page()) {
        get_template_part('layouts/home');
    }
    else {
        get_template_part('layouts/default');
    }

?>