<?php

define("DIR_IN", "template/svg_in/");
define("DIR_OUT", "template/svg/");

$dirIt = new DirectoryIterator(DIR_IN);

$cnt = 0;
foreach ($dirIt as $fInfo) {
    if ($fInfo->isDot()) {
        continue;
    }
    $fName = $fInfo->getFilename();
    echo "processing $fName...\n";
    
    $svgData = file_get_contents(DIR_IN.$fName);
    
    $prefix = stristr($fName, ".svg", true);
    
    // extract raw geometry and save to individual files prefixed by $prefix
    $svgData = extract_selectors($svgData, $prefix);
    
    $cnt++;
}

echo "--> converted $cnt svg images\n";


function extract_selectors($svg_in, $prefix) {
    $svg_xml = new SimpleXMLElement($svg_in);
    
    $svg = array();

    foreach ($svg_xml->g as $group) {
        $label = $group->attributes('http://www.inkscape.org/namespaces/inkscape')->label;
        
        // only treat named layers starting with "_" as selectors
        if ($label != false && substr($label, 0, 1) == "_") {
            $svg = "";
            foreach ($group->children() as $child) {
            
                // remove style from element as we only want CSS styling
                unset($child->attributes()->style);
                $svg .= $child->asXML();
            }
            
            // write XML to file
            file_put_contents(DIR_OUT.$prefix.$label.".svg_part", $svg);
        }
    }
}

?>
