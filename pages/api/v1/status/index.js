function status(request, response) {
  response.status(200).json({ chave: "são acima da média" });
  //.send "não é em UTF8", mas o .json é
}

export default status;
