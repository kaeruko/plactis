<?php

$options = getopt("s:d:");
$memcache = new Memcached();
$memcache->addServer('localhost', 11211);

//setの場合
if(isset($options["s"])){
    $cache_key = $options["s"];
    $count = $memcache->get($cache_key, null, $cas_token);
//var_dump($cas_token);
    if($memcache->getResultCode() == Memcached::RES_NOTFOUND){
        $count = 1;
        $memcache->add($cache_key, $count, 50);
        print "{$cache_key}を登録しました\n";
    }else{
        ++$count;
        $memcache->cas($cas_token, $cache_key, $count);
        print "{$cache_key}を更新しました {$count}\n";
    }
}

//deleteの場合
if(isset($options["d"])){
    $cache_key = $options["d"];
    $count = $memcache->get($cache_key);
    if($count){
        $memcache->delete($cache_key);
        print "{$cache_key}を削除しました {$count}\n";
    }else{
        print "{$cache_key}はありません\n";
    }
}


