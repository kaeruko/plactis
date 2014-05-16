<?php

$options = getopt("s:d:");
$memcache = new Memcached();
$memcache->addServer('localhost', 11211);

//setの場合
if(isset($options["s"])){
    $count = $memcache->get($options["s"]);
    $count =  $count ? ++$count : 1;
    $memcache->set($options["s"], $count, 50);
    print "{$options["s"]}を登録しました {$count}\n";
}

if(isset($options["d"])){
    $count = $memcache->get($options["d"]);
    if($count){
        $memcache->delete($options["d"]);
        print "{$options["d"]}を削除しました {$count}\n";
    }else{
        print "{$options["d"]}ありません\n";
    }
}


