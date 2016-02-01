toBinary = (dec) ->
  ('000000000000000000000000000000000000000' + (dec >>> 0).toString(2)).slice -32

toInt = (binary) ->
  parseInt(binary, 2) >> 0

String::replaceAt = (index, character) ->
  @substr(0, index) + character + @substr(index + character.length)
