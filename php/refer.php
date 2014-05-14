<?php

//全htmlを取得
$allhtmls = array_filter(explode("\n",shell_exec("ls motomi/*/*htm")), 'strlen');

//参照先リンクを保存
foreach($allhtmls as $id => $html){
    //referにhtmlファイル名を追加
    $refers[] = $html;
    $refers = array_merge( refer($html), $refers);
}

var_dump(array_count_values($refers));


//asort($refers);
//var_dump($refers);

function refer( $html ){
    $contents = file_get_contents($html);
    preg_match_all('/<[A|a] href=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
//    preg_match_all('/.+<?\shref=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
    return $matches[1];
}