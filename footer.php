<?php
/**
 * The footer template
 *
 *
 * @package WordPress Starter Kit
 * @version 1.0
 */

?>

		</div><!-- #content -->

		<footer>			
			<?php wp_nav_menu(array(
                'theme_location' => 'footer_menu',
                'container' => 'nav',
                'container_class' => 'menu footer icons'
                )); 
			?>
			
			<?php wp_nav_menu(array(
                'theme_location' => 'social_menu',
                'container' => 'nav',
                'container_class' => 'menu social icons'
                )); 
			?>

			<div class="aimhigher logo">
				<a href="https://aimhigherweb.design" target="_blank" rel="nofollow">
					<?php 
						$logo_aimhigher = get_site_url() . '/wp-content/themes/wordpress/resources/img/aimhigher.svg';
						echo file_get_contents($logo_aimhigher);
					?>
				</a>
			</div>
		</footer>

		<script type="text/javascript" src="/wp-content/themes/wordpress/resources/js/main.js" ></script>
		<?php wp_footer(); ?>
    </body>
</html>
