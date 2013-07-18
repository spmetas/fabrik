<?php
/**
 * Renders a list of Bootstrap field class sizes
 *
 * @package     Joomla
 * @subpackage  Form
 * @copyright   Copyright (C) 2005 Rob Clayburn. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();

JFormHelper::loadFieldClass('list');

/**
 * Renders a list of Bootstrap field class sizes
 *
 * @package     Joomla
 * @subpackage  Form
 * @since       1.5
 */

class JFormFieldBootstrapfieldclass extends JFormFieldList
{

	/**
	 * Method to get the field options.
	 *
	 * @return  array  The field option objects.
	 */

	protected function getOptions()
	{
		$sizes = array();
		$sizes[] = JHTML::_('select.option', 'input-mini');
		$sizes[] = JHTML::_('select.option', 'input-small');
		$sizes[] = JHTML::_('select.option', 'input-medium');
		$sizes[] = JHTML::_('select.option', 'input-large');
		$sizes[] = JHTML::_('select.option', 'input-xlarge');
		$sizes[] = JHTML::_('select.option', 'input-xxlarge');
		$sizes[] = JHTML::_('select.option', 'input-block-level');
		$sizes[] = JHTML::_('select.option', 'span1');
		$sizes[] = JHTML::_('select.option', 'span2');
		$sizes[] = JHTML::_('select.option', 'span3');
		$sizes[] = JHTML::_('select.option', 'span4');
		$sizes[] = JHTML::_('select.option', 'span5');
		$sizes[] = JHTML::_('select.option', 'span6');
		$sizes[] = JHTML::_('select.option', 'span7');
		$sizes[] = JHTML::_('select.option', 'span8');
		$sizes[] = JHTML::_('select.option', 'span9');
		$sizes[] = JHTML::_('select.option', 'span10');
		$sizes[] = JHTML::_('select.option', 'span11');
		$sizes[] = JHTML::_('select.option', 'span12');
		return $sizes;
	}
}
