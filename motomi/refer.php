<?php

const HTMLDIR = "motomi/";

//全htmlを取得
$allhtmls = array_filter(explode("\n",shell_exec("ls ".HTMLDIR."/*/*htm" )), 'strlen');

//参照先リンクを保存
foreach($allhtmls as $id => $html_full){
    //ディレクトリ名とファイル名を分ける
    preg_match('/^.*?\/(.*)\/(.*\.htm)/', $html_full, $matches);
    $dir = $matches[1];
    $htm = $matches[2];
    $refers[] = $htm;
    $refers = array_merge( refer($dir, $htm), $refers);
}

$count_refers = array_count_values($refers);
foreach ($count_refers as $html => $count) {
    if($count == 1){
        print($html)."\n";
    }
}

function refer( $dir, $html ){
    $contents = file_get_contents( HTMLDIR . $dir."/".$html);
    preg_match_all('/<a href=[\'|"](.*?)[\'|"].*/i', $contents, $matches, PREG_PATTERN_ORDER);
    $add_dir = function($html) use( $dir) {
//        if(strpos($html, "http", 0) == 0 || strpos($html, "mail", 0) == 0)return false;
//        return $dir."/".$html;
        return $html;
    };

    return array_filter(array_map($add_dir, $matches[1]));
}