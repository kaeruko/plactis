<?php
$args = array_slice($argv, 1);
foreach ($args as $arg) {
    $ret = toDecimal($arg);
    echo $ret;
}


function toDecimal($num){
    $num = str_split($num);
    $a = array_reverse($num);
    foreach ($a as $key => $val) {
        $ans += pow(2, $key) * $val;
    }
    return $ans;
}

