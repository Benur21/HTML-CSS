<meta charset="UTF-8">
<style>
table {
    border-collapse: collapse;
}
table, td, th {
    border: 1px solid black;
}
</style>
<?php
  
  
  criarConexao("localhost", "id1528808_username", "database", "id1528808_testdb");
  
  
  
  
  
  //escreve("ANTES:");
  
  mostrarTabela();
  
  /*
  //Adicionar um aluno:
  $sql = "INSERT INTO Alunos (Nome, Idade)
          VALUES ('Joao', 15)";
  
  if (mysqli_query($conn, $sql)) {
    echo "Novo aluno inserido corretamente.";
  }
  else {
    echo "Erro: " . $sql . "<br>" . mysqli_error($conn);
  }
  */
  //escreve("DEPOIS:");
  
  //mostrarTabela();
  
  
  
  
  
  
  
  function mostrarTabela() {
    global $conn;
  	//Obter os dados da tabela:
  	$sql = "SELECT * 
    FROM information_schema.tables
    WHERE table_schema = 'id1528808_testdb' AND table_name = 'Alunos'
    LIMIT 1";
  	$result = mysqli_query($conn, $sql);
  	echo(escreve("Número de campos na tabela: ".mysqli_num_fields($result)));
  	echo(escreve("Número de registos na tabela: ".mysqli_num_rows($result)));

  	//Linha-título da tabela:
  	$row = mysqli_fetch_assoc($result) or die(escreve("Não há nenhum registo na tabela.")); //O mysqli_fetch_assoc retorna a primeira linha do resultado como array e aumenta o ponteiro em 1 (inicialmente é 0).
  	echo("<table><tr>");
  	foreach(array_keys($row)as $collumnName) {
  		echo "<th>$collumnName</th>";
  	}
  	echo("</tr>");

  	mysqli_data_seek($result, 0); //Colocar o ponteiro do fetch no início novamente

  	//Resto da tabela:
  	while ($row = mysqli_fetch_assoc($result)) { //Enquanto houver linhas à frente do ponteiro ele vai colocá-las no $row
  		echo("<tr>");
  		foreach($row as $value) {
  			echo("<th>$value</th>");
  		}
  		echo("</tr>");
  	}
  	echo("</table>");
  }
  
  function criarConexao($servername, $username, $password, $databaseName) {
  	//Criando uma conexão com o servidor de databases
  	$GLOBALS['conn'] = mysqli_connect($servername, $username, $password, $databaseName)
    or die(escreve("A conexão falhou: ".mysqli_connect_error()));
    echo(escreve("Conexão feita com sucesso!"));
    global $conn;
  	
    /*
    if ($conn) {
  		escreve("Sucesso!");
  	} else {
  		escreve("A conexão falhou: ".mysqli_connect_error());
  	};*/

  }
  
  
  function escreve($texto) {
    return "<p>$texto</p>";
  }
?>