<?php
$args = array_slice($argv, 1);
foreach ($args as $arg) {
    $ret = toDecimal($arg);
    echo $ret;
}
$ans = 0;

function toDecimal($num){
    $num = str_split($num);
    $a = array_reverse($num);
    $ans = 0;
    foreach ($a as $key => $val) {
        $ans += pow(2, $key) * $val;
    }
    return $ans;
}

