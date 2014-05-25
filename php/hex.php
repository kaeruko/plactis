<?php
$args = array_slice($argv, 1);
foreach ($args as $arg) {
    $ret = toHex($arg);
    $hex =  str_pad($ret, 3, "0", STR_PAD_LEFT);
echo "$hex ";
}

function toHex($num){
    while(true)
    {
        $remainder = $num%16;
        $num = ($num - $remainder) /16;
        $ans[] = $remainder;
        if($num < 1)break;
    }
    return implode(array_reverse($ans),"");
}

