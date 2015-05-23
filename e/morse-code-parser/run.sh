scxml save morse.scxml
scxml run morse.scxml -n _singleton
scxml viz morse.scxml/_singleton 
scxml send morse.scxml/_singleton system.start
scxml interact morse.scxml/_singleton
scxml rm morse.scxml/_singleton   # clean up when shell terminates - delete the instance
