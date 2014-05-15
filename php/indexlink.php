<?php


/**
*
*/
class indexlink
{

    //参照されたことのない置き去りhtm
    public $notrefs = array();
    //参照されてるけど存在しないリンク
    public $notexist = array();
    //存在しないリンクを張ってるhtm
    public $errorlink = array();

    function __construct($workdir)
    {
        //カウンタ用のリスト
        $refDepthCount = array();

        //全htmlを取得
        $indexfiles = array_filter(explode("\n",shell_exec("ls ".$workdir."/*/index.ht*" )), 'strlen');
        $allfiles = array_filter(explode("\n",shell_exec("ls ".$workdir."/*/*htm*" )), 'strlen');
        foreach ($indexfiles as $key => $indexfile) {
            $tmp = explode("/", $indexfile);
            $dir = $tmp[count($tmp)-2];
            $html = $tmp[count($tmp)-1];
            $refDepthCount[$dir."/".$html] = 0;
        }

        $count = 1;
        while($count < 5){
            foreach (array_keys($refDepthCount) as $htmlile) {
                $tmp = explode("/", $htmlile);
                $dir = $tmp[count($tmp)-2];
                $html = $tmp[count($tmp)-1];
                $reffiles = $this->refer($dir, $html, $workdir);
                foreach ($reffiles as $reffile) {
                    if(isset($refDepthCount[$reffile]) === false){
                        $refDepthCount[$reffile] = $count;
                    }
                }
            }
            $count ++;
        }


        foreach ($allfiles as $allfile) {

//var_dump($allfile);
            $tmp = explode("/", $allfile);
            $dir = $tmp[count($tmp)-2];
            $html = $tmp[count($tmp)-1];
            if(isset($refDepthCount[$dir."/".$html]) === false){
                $this->notrefs[] = "{$dir}/{$html}";
            }
        }

        $this->notexist = array_unique($this->notexist);
    }

    function refer( $dir, $html , $workdir){
        $contents = @file_get_contents( $workdir . $dir."/".$html);
        if(!$contents){
            $this->notexist[] = $dir."/".$html;
        }

        preg_match_all('/.+<?\shref=[\'|"](.*?)[\'|"].*/', $contents, $matches, PREG_PATTERN_ORDER);
        $add_dir = function($url) use( $dir, $html) {
        if($dir == "takken" &&
        (
            $url == "menkyosetumei.html" ||
            $url == "menkyoyouken.html" ||
            $url == "mumenkyohanbai.html" ||
            $url == "needmenkyo.html"
        )
            )
        {
            $this->errorlink[$dir."/".$html][] = $url;
        }

       if(strpos($url, "http", 0) === 0 ||
            strpos($url, "htm", 0) === false ||
             $url === $html) return false;

            return $dir."/".$url;
        };

        return array_filter(array_map($add_dir, $matches[1]));
    }

}

//フォルダ指定
$indexlink = new indexlink($argv[1]);

print "参照されてないhtm\n";
foreach ($indexlink->notrefs as  $notrefs) {
    print $notrefs."\n";
}

print "存在しないhtm\n";
foreach ($indexlink->notexist as $notexist) {
    print $notexist."\n";
}

print "存在しないhtmを参照しているhtm\n";
foreach ($indexlink->errorlink as $errorlink => $urls ) {
    print "参照元:".$errorlink."\n";
    $urls = array_unique($urls);
    foreach ($urls as $url) {
        print "$url\n";
    }
}

//var_dump($indexlink->notexist);
//
//var_dump($indexlink->errorlink);
