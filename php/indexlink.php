<?php

//フォルダ指定
$workdir = $argv[1];

//カウンタ用のリスト
$refDepthCount = array();

//全htmlを取得
$indexfiles = array_filter(explode("\n",shell_exec("ls ".$workdir."/*/index.ht*" )), 'strlen');

foreach ($indexfiles as $key => $indexfile) {
    $tmp = explode("/", $indexfile);
    $dir = $tmp[count($tmp)-2];
    $html = $tmp[count($tmp)-1];
    $refDepthCount[$dir."/".$html] = 0;
}

while(5){
foreach (array_keys($refDepthCount) as $htmlile) {
    $tmp = explode("/", $htmlile);
    $dir = $tmp[count($tmp)-2];
    $html = $tmp[count($tmp)-1];
    $reffiles = refer($dir, $html, $workdir);
    foreach ($reffiles as $reffile) {
        if(isset($refDepthCount[$reffile]) === false){
            $refDepthCount[$reffile] = 1;
        }
    }
}
};
var_dump($refDepthCount);


function refer( $dir, $html , $workdir){
    $contents = file_get_contents( $workdir . $dir."/".$html);
    preg_match_all('/.+<?\shref=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
//var_dump($matches);
    $add_dir = function($url) use( $dir, $html) {
       if(strpos($url, "http", 0) === 0 ||
        strrpos($url, "htm", 0) === false || $url === $html) return false;

        return $dir."/".$url;
    };

    return array_filter(array_map($add_dir, $matches[1]));

}