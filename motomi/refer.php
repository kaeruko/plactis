<?php

//const HTMLDIR = "./motomi/";
const HTMLDIR = "/home/www/test/motomi/";

//全htmlを取得
$allhtmls = array_filter(explode("\n",shell_exec("ls ".HTMLDIR."/*/*htm" )), 'strlen');

//参照先リンクを保存
foreach($allhtmls as $id => $html_full){
    //ディレクトリ名とファイル名を分ける
    $tmp = explode("/", $html_full);
    $dir = $tmp[count($tmp)-2];
    $html = $tmp[count($tmp)-1];
    $refers[] = $dir."/".$html;
    $refers = array_merge( refer($dir, $html), $refers);
}

asort($refers);
//var_dump($refers);
$count_refers = array_count_values($refers);
asort($count_refers);
var_dump($count_refers);
foreach ($count_refers as $html => $count) {
    if($count == 1){
       print($html)."\n";
    }
}

function refer( $dir, $html ){
    $contents = file_get_contents( HTMLDIR . $dir."/".$html);
    preg_match_all('/.+<?\shref=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
//var_dump($matches);
    $add_dir = function($url) use( $dir, $html) {
       if(strpos($url, "http", 0) === 0 ||
        strrpos($url, "htm", 0) === false || $url === $html) return false;
        return $dir."/".$url;
    };

    return array_filter(array_map($add_dir, $matches[1]));

}