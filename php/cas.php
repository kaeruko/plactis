<?php

class KaerukoMemcache
{

    public $memcache;
    public $cache_key;

    function __construct(){
        $this->memcache = new Memcached();
        $this->memcache->addServer('localhost', 11211);
        $this->retry_count = 0;
    }

    //getの場合
    function cacheGet($cache_key){
        $count = $this->memcache->get($cache_key, null, $cas_token);
var_dump($cas_token);
        print "{$cache_key}を取得しました {$count}\n";
    }

    //setの場合
    function cacheSet($cache_key){
        $count = $this->memcache->get($cache_key, null, $cas_token);
var_dump($cas_token);
        sleep(7);
        if($this->memcache->getResultCode() == Memcached::RES_NOTFOUND){
            $count = 1;
            $this->memcache->add($cache_key, $count, 50);
            print "{$cache_key}を登録しました\n";
        }else{
            ++$count;
            $ret = $this->memcache->cas($cas_token, $cache_key, $count);
            // $ret = $this->memcache->set($cache_key, $count);
            if($ret === false && $this->retry_count < 3){
                print "{$cache_key}の更新に失敗しました。 {$count}\n";
                $this->retry_count++;
                $this->cacheSet($cache_key);
            }else{
                print "{$cache_key}を更新しました {$count}\n";
            }
        }
    }


    function cacheDelete($cache_key){
        $count = $this->memcache->get($cache_key);
        if($count){
            $this->memcache->delete($cache_key);
            print "{$cache_key}を削除しました {$count}\n";
        }else{
            print "{$cache_key}はありません\n";
        }
    }
}


$options = getopt("s:d:g:");
$memcach_obj = new KaerukoMemcache();

if(isset($options["s"])){
    $memcach_obj->cacheSet($options["s"]);
}
if(isset($options["g"])){
    $memcach_obj->cacheGet($options["g"]);
}
if(isset($options["d"])){
    $memcach_obj->cacheDelete($options["d"]);
}




