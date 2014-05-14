<?php

//全htmlを取得
$allhtmls = array_filter(explode("\n",shell_exec("ls motomi/*/*htm")), 'strlen');

//参照先リンクを保存
foreach($allhtmls as $id => $html){
    //referにhtmlファイル名を追加
    $refers[] = $html;
    $refers = array_merge( refer($html), $refers);
}

$count_refers = array_count_values($refers);
foreach ($count_refers as $html => $count) {
    if($count == 1){
        print($html)."\n";
    }
}

function refer( $html ){
    $contents = file_get_contents($html);
    preg_match_all('/<[A|a] href=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
//    preg_match_all('/.+<?\shref=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
    return $matches[1];
}