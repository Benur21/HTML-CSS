<?php
/*client_ip*/$client_ip = $_SERVER["REMOTE_ADDR"];
	date_default_timezone_set('Europe/Lisbon'); //Configura o relógio do servidor para o fuso horário de Lisboa
/*time*/$time = date('H:i:s');
/*date*/$date = date('Y/m/d');
/*page*/$page = basename($_SERVER["SCRIPT_FILENAME"]);
  criarConexao("localhost", "id1528808_tracking_code", "3897g3apd8rhvha4hf948ytacoij4waoiru", "id1528808_analyticsdb");
  
  if (!tabelaExiste("Visits", "id1528808_analyticsdb")) {
    criarTabela("Visits");
  }
  
  $sql = "
    INSERT INTO Visits (ID, ClientIP, Org, Country, Region, City, Hostname, Time, Date, Page, URL, NthTime, Useragent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";
  $stmt = mysqli_prepare($conn, $sql) or die(escreve("Erro 0x0001: ".mysqli_error($conn)));
  mysqli_stmt_bind_param($stmt, "sssssssssssis", $ID, $client_ip, $org, $country, $region, $city, $hostname, $time, $date, $page, $url, $nthTime, $useragent) or die(escreve("Erro 0x0002: ".mysqli_error($conn)));
  
  /*
  $filename = "visit_logs.html"; //O ficheiro a ler
  $handle = fopen($filename, "r"); //Abre o ficheiro para leitura
  $contents = fread($handle, filesize($filename)); //Lê o conteúdo total do ficheiro e colocá-lo em $contents
  fclose($handle); //Fecha o ficheiro
  */
  
	//$file = fopen($filename,"a"); //Abre o ficheiro para escrita
  
  $data = json_decode(file_get_contents("http://ipinfo.io/".$client_ip."?token=110161749c8f5d")); //Obtém informações acerca do ip do cliente
  $countryCodes = json_decode(file_get_contents("http://html-js.comxa.com/php/countrynames.json")); //Obtém as conversões dos códigos de países para os nomes dos países
  
  
  //Se a informação existir utiliza-a; senão utiliza um valor padrão.
/*org*/if (isset($data->org)){
    $org = $data->org;
  } else {
    $org = "-";
  };
  
/*city*/if (isset($data->city)){
    $city = $data->city;
  } else {
    $city = "-";
  };
  
/*region*/if (isset($data->region)){
    $region = $data->region;
  } else {
    $region = "-";
  };
  
  //$hostname = ifexists($data->hostname, "-");
  
/*hostname*/if (isset($data->hostname)){
    $hostname = $data->hostname;
  } else {
    $hostname = "-";
  };
  
/*countryCode*/if (isset($data->country)){
    $countryCode = $data->country;
  } else {
    $countryCode = "?";
  };
  
/*country*/if (isset($countryCodes->{$countryCode})){
    $country = $countryCodes->{$countryCode};
  } else {
    $country = "?";
  };
  
  $country = $countryCode.":". PHP_EOL .$country;
  
/*url*/$url = "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; //O url da página a ser carregada
  
/*useragent*/$useragent = $_SERVER['HTTP_USER_AGENT'];
  
/*nthTime*/$nthTime = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Visits WHERE ClientIP = '$client_ip'")) + 1;
  
/*ID*/if (!tabelaExiste("Visitors", "id1528808_analyticsdb")) {
    criarTabela("Visitors");
  }

  //Se já houver um registo do visitante, utiliza a sua Identificação e atualiza o Nth; senão cria um novo
  $result = mysqli_query($conn, "SELECT * FROM Visitors WHERE ClientIP = '$client_ip' LIMIT 1")or die(escreve("Erro 0x0003: ".mysqli_error($conn)));
  if (mysqli_num_rows($result) == 1) {
  	$ID = mysqli_fetch_assoc($result)["Identification"];
  	mysqli_query($conn, "UPDATE Visitors SET TimesVisited = $nthTime WHERE ClientIP = '$client_ip'");
  }
  else {
  	$ID = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM Visitors")) + 1;
  	mysqli_query($conn, "INSERT INTO Visitors (ClientIP, Identification, TimesVisited) VALUES ('$client_ip', '$ID', '$nthTime')")or die(escreve("Erro 0x0004: ".mysqli_error($conn)));
  }
  
  mysqli_stmt_execute($stmt) or die(escreve("Erro 0x0005: ".mysqli_error($conn)));
  
  
  /*
  $firstLocation = strpos($contents, $client_ip);
  $i = 0;
  while () {
    $i = $i + 1;
    $firstLocation - $i;
  }
  
  $ipID = strpos($contents, $client_ip); */
  /*
  Falta completar acima e testar a função getStringFromTo no final do documento.
  https://www.w3schools.com/php/php_ref_string.asp
  https://www.w3schools.com/php/func_string_substr.asp
  https://www.w3schools.com/php/showphp.asp?filename=demo_func_string_strpos
  https://www.google.pt/search?biw=1366&bih=638&q=php+string+return+substring+of+a+string&oq=php+string+return+substring+of+a+string&gs_l=psy-ab.3..33i22i29i30k1l2.947510.955422.0.955521.33.27.2.0.0.0.266.2932.8j13j2.23.0....0...1.1.64.psy-ab..8.25.2939...0j0i67k1j0i19k1j0i22i30i19k1j0i22i30k1j0i22i10i30k1j0i8i13i30k1j33i160k1.NpsKfZL_OaY
  Queria ver se instalava o PHP pra poder testar coisas facilmente.
  */
  
  
  
  
  
  //OLD: fwrite($file,PHP_EOL . $client_ip." at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
  /*
  switch ($client_ip) {
    case "84.90.161.23": //HOME - DO NOT TRACK
      break;
	  case "193.236.76.152": //ME?
      if (!((isset($_GET["me"]) && $_GET["me"] == "me") || (isset($_COOKIE["me"]) && $_COOKIE["me"] == "me"))) {
        fwrite($file,PHP_EOL . 
        "  <tr>". PHP_EOL .
        "    <td title='"."0"."'>"."0"."</td>".PHP_EOL .
        "    <td>". $client_ip ."</td>". PHP_EOL .
        "    <td title='".$org."'>". $org ."</td>". PHP_EOL .
        "    <td title='".$countryCode. ":&#10;". $country ."'>". $countryCode. ":<br>". $country ."</td>". PHP_EOL .
        "    <td title='".$region."'>". $region ."</td>". PHP_EOL .
        "    <td title='".$city."'>". $city ."</td>". PHP_EOL .
        "    <td title='".$hostname."'>". $hostname ."</td>". PHP_EOL .
        "    <td title='".date('H:i:s')."'>". date('H:i:s') . "</td>". PHP_EOL .
        "    <td title='".date('d/m/Y')."'>". date('d/m/Y') ."</td>". PHP_EOL .
        "    <td title='".basename($_SERVER["SCRIPT_FILENAME"])."'>". basename($_SERVER["SCRIPT_FILENAME"]) ."</td>". PHP_EOL .
        "    <td title='".$url."'>".$url."</td>". PHP_EOL .
        "    <td title='".$nthTime."'>". $nthTime ."</td>". PHP_EOL .
        "    <td><a href='http://whatismyipaddress.com/ip/". $client_ip ."'>+Info</a></td>". PHP_EOL .
        "  </tr>");
      } else {
        if (!isset($_COOKIE["me"])) {
          setcookie("me", "me", time() + 3600 * 24 * 365, "/");
        }
      }
      break;
    default:
      fwrite($file,PHP_EOL . 
      "  <tr>". PHP_EOL .
      "    <td title='"."0"."'>"."0"."</td>".PHP_EOL .
      "    <td>". $client_ip ."</td>". PHP_EOL .
      "    <td title='".$org."'>". $org ."</td>". PHP_EOL .
      "    <td title='".$countryCode. ":&#10;". $country ."'>". $countryCode. ":<br>". $country ."</td>". PHP_EOL .
      "    <td title='".$region."'><div>". $region ."</div></td>". PHP_EOL .
      "    <td title='".$city."'>". $city ."</td>". PHP_EOL .
      "    <td title='".$hostname."'><div>". $hostname ."</div></td>". PHP_EOL .
      "    <td title='".date('H:i:s')."'>". date('H:i:s') . "</td>". PHP_EOL .
      "    <td title='".date('d/m/Y')."'>". date('d/m/Y') ."</td>". PHP_EOL .
      "    <td title='".basename($_SERVER["SCRIPT_FILENAME"])."'>". basename($_SERVER["SCRIPT_FILENAME"]) ."</td>". PHP_EOL .
      "    <td title='".$url."'><div>".$url."</div></td>". PHP_EOL .
      "    <td title='".$nthTime."'>". $nthTime ."</td>". PHP_EOL .
      "    <td><a href='http://whatismyipaddress.com/ip/". $client_ip ."'>+Info</a></td>". PHP_EOL .
      "    <!-- ". $_SERVER['HTTP_USER_AGENT'] ." -->". PHP_EOL .
      "  </tr>");
      break;
  }*/
  /*
	switch ($client_ip) {
	  case "84.90.161.23": //HOME - DO NOT TRACK
      break;
	  case "193.236.76.152": //ME?
      if (!( $_GET["me"]=="me" || $_COOKIE["me"]=="me" )) {
        fwrite($file, PHP_EOL.$client_ip." (ME?) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      } else {
        if (!isset($_COOKIE["me"])) {
          setcookie("me","me",time()+3600*24*365,"/");
        }
      }
      break;
    case "31.170.167.6": //WEBHOST
      fwrite($file,PHP_EOL . $client_ip." (WEBHOST) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.17": //GOOGLE1
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE1) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.18": //GOOGLE2
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE2) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.19": //GOOGLE3
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE3) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.102.9.27":  //GOOGLE4
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE4) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.197":  //GOOGLE5
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE5) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.34":  //GOOGLE6
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE6) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.37":  //GOOGLE7
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE7) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.39":  //GOOGLE8
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE8) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.93.44":  //GOOGLE9
      fwrite($file,PHP_EOL . $client_ip." (GOOGLE9) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.87":  //GOOGLEBOT1 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT1) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.83":  //GOOGLEBOT2 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT2) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.79":  //GOOGLEBOT3 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT3) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.51":  //GOOGLEBOT4 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT4) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.96":  //GOOGLEBOT5 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT5) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.84":  //GOOGLEBOT6 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT6) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "66.249.65.94":  //GOOGLEBOT7 WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (GOOGLEBOT7) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "23.101.61.176":  //MICROSOFT1
      fwrite($file,PHP_EOL . $client_ip." (MICROSOFT1) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "104.45.18.178":  //MICROSOFT2
      fwrite($file,PHP_EOL . $client_ip." (MICROSOFT2) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "180.76.15.152": //BAIDU BEIJING WEB CRAWLER
      fwrite($file,PHP_EOL . $client_ip." (BAIDUCRAWLER) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "68.180.230.158": //YAHOO!
      fwrite($file,PHP_EOL . $client_ip." (YAHOO) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "68.180.229.248": //YAHOO!2
      fwrite($file,PHP_EOL . $client_ip." (YAHOO2) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "104.131.147.112": //DIGITALOCEAN
      fwrite($file,PHP_EOL . $client_ip." (DIGITALOCEAN) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "122.58.89.163": //SPARKNZ
      fwrite($file,PHP_EOL . $client_ip." (SPARKNZ) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "185.20.6.3": //MEDIASIFTLIMITED
      fwrite($file,PHP_EOL . $client_ip." (MEDIASIFTLIMITED) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "104.243.37.49": //CHOPPA
      fwrite($file,PHP_EOL . $client_ip." (CHOPPA) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "52.3.127.144": //AMAZON1
      fwrite($file,PHP_EOL . $client_ip." (AMAZON1) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "54.244.49.242": //AMAZON2
      fwrite($file,PHP_EOL . $client_ip." (AMAZON2) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "34.196.34.92": //AMAZON3
      fwrite($file,PHP_EOL . $client_ip." (AMAZON3) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "54.89.169.101": //AMAZON4
      fwrite($file,PHP_EOL . $client_ip." (AMAZON4) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "54.175.95.105": //AMAZON5
      fwrite($file,PHP_EOL . $client_ip." (AMAZON5) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "54.90.120.8": //AMAZON6
      fwrite($file,PHP_EOL . $client_ip." (AMAZON6) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
    case "52.89.135.38": //AMAZON7
      fwrite($file,PHP_EOL . $client_ip." (AMAZON7) at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
      break;
	  default:
	    fwrite($file,PHP_EOL . $client_ip." at ".date('H:i:s')." in ".date('d/m/Y')." visited ".basename($_SERVER["SCRIPT_FILENAME"])." (".$url.")<br>");
	    break;
	} */
	
  //fclose($file);
  
  function ifexists($var,$default) {
    if (isset($var) && !($var == "")) {
      return $var;
    } else {
      return $default;
    }
  }
  
  function getStringFromTo($strng,$from,$to) {
    return substr($strng,$from,$to-$from);
  }
  
  function escreve($texto) {
    return "<p>$texto</p>";
  }

  //Database:
  function criarConexao($servername, $username, $password, $databaseName) {
  	//Criando uma conexão com o servidor de databases
  	$GLOBALS['conn'] = mysqli_connect($servername, $username, $password, $databaseName)
    or die(escreve("A conexão falhou: ".mysqli_connect_error()));
  }
  
  function tabelaExiste($tabela, $nomeDaDB) {
    global $conn;
  	//Obter a lista de tabelas com esse nome:
  	$sql =
      "SELECT * FROM information_schema.tables
      WHERE table_schema = '$nomeDaDB' AND table_name = '$tabela'
      LIMIT 1
      ";
  	$result = mysqli_query($conn, $sql);
  	return (mysqli_num_rows($result) == 1); //Se a lista de tabelas tiver 1 linha retorna true, se tiver 0 retorna false
  }
  
  function criarTabela($qual) {
    global $conn;
    
    switch ($qual) {
    case "Visits":
      $sql =
        "CREATE TABLE Visits (
          N INT UNSIGNED AUTO_INCREMENT,
          ID VARCHAR(10),
          ClientIP VARCHAR(39),
          Org TEXT,
          Country TINYTEXT,
          Region TINYTEXT,
          City TINYTEXT,
          Hostname TEXT,
          Time TIME,
          Date DATE,
          Page TINYTEXT,
          URL TEXT,
          NthTime INT,
          Useragent TEXT,
          PRIMARY KEY (N)
        )";
      break;
    case "Visitors":
      $sql =
        "CREATE TABLE Visitors (
          N INT AUTO_INCREMENT,
          ClientIP VARCHAR(39),
          Identification VARCHAR(10),
          TimesVisited INT,
          PRIMARY KEY (N)
        )";
      break;
    }
      mysqli_query($conn, $sql) or die("Error creating table: " . mysqli_error($conn));
  }
?>