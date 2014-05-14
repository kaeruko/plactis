<?php

//全htmlを取得
$allhtmls = array_filter(explode("\n",shell_exec("ls motomi/*/*htm" )), 'strlen');

//参照先リンクを保存
foreach($allhtmls as $id => $html_full){
    if($matches)continue;
    //ディレクトリ名とファイル名を分ける
    preg_match('/^.*?\/(.*)\/(.*\.htm)/', $html_full, $matches);
    $dir = $matches[1];
    $htm = $matches[2];
    $refers[] = $dir."/".$htm;
    $refers = array_merge( refer($dir, $html_full), $refers);
}

$count_refers = array_count_values($refers);
//var_dump($count_refers);
foreach ($count_refers as $html => $count) {
    if($count == 1){
      print($html)."\n";
    }
}

function refer( $dir, $html ){
    $contents = file_get_contents($html);
    //検索する時はhtmlだけ
    preg_match_all('/<a href=[\'|"](.*?)[\'|"].*/i', $contents, $matches, PREG_PATTERN_ORDER);
    $add_dir = function($html) use( $dir) {
//        if(strpos($html, "http", 0) == 0)return 0;
        return $dir."/".$html;
    };

    return array_map($add_dir, $matches[1]);
}