<?php
$args = array_slice($argv, 1);
foreach ($args as $arg) {
    // $ret = toBinary($arg);
    // $binary =  str_pad($ret, 8, "0", STR_PAD_LEFT);
//   echo "decimal[$arg] binary[$binary]\n";
    $ret = toDecimal($arg);
    echo $ret;

}

function toBinary($num){
    while(true)
    {
        $remainder = $num%2;
        $num = ($num - $remainder) /2;
        $ans[] = $remainder;
        if($num < 1)break;
    }
    return implode(array_reverse($ans),"");
}

function toDecimal($num){
    $num = str_split($num);
    $a = array_reverse($num);
    foreach ($a as $key => $val) {
        $ans += pow(2, $key) * $val;
    }
    echo $ans;
}

