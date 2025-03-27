# The lines up to and including sys.stderr should always come first
# Then any errors that occur later get reported to the console
# If you'd prefer to report errors to a file, you can do that instead here.
import sys
from Npp import *

# Set the stderr to the normal console as early as possible, in case of early errors
sys.stderr = console

# Define a class for writing to the console in red
class ConsoleError:
	def __init__(self):
		global console
		self._console = console;

	def write(self, text):
		self._console.writeError(text);

# Set the stderr to write errors in red
sys.stderr = ConsoleError()

# This imports the "normal" functions, including "help"
import site

sys.stdout = console

# In order to set the stdout to the current active document, uncomment the following line
# sys.stdout = editor
# So print "hello world", will insert "hello world" at the current cursor position
























'''

# AUTO FOLDING
import os

# ---------------------------- configuration area -----------------------------

FILE_EXTENSION_LIST = ['.html','.js']
COLLPASE_LINE_IDENTIFIER = 'collapseit' # collapse()
COLLPASE_FROM_TO_IDENTIFIER = 'collapse\((\d+,\d+)\)' # collapse\((\d+,\d+)\)

# -----------------------------------------------------------------------------


def scan(number_of_lines):
    
    def find_line_identifiers(): # NPP_COLLAPSE_IT
        matches = []
        editor.research('\\b{0}\\b'.format(COLLPASE_LINE_IDENTIFIER), lambda m: matches.append(m.span()), 0)
        print "Line: " + str(matches)
        return matches
    
    def find_from_to_line_identifiers(): # NPP_COLLAPSE(19,41)
        matches = []
        editor.research(COLLPASE_FROM_TO_IDENTIFIER, lambda m: matches.append(m.span(1)), 0)   
        print "From-To: " + str(matches)
        return matches
            
    for match in find_line_identifiers():
        _line = editor.lineFromPosition(match[0])
        print "---------- CONST FOLDLEVEL.HEADERFLAG = " + str(int(FOLDLEVEL.HEADERFLAG))
        print "editor.getFoldLevel(" + str(_line) + ") = " + str(editor.getFoldLevel(_line))
        print "editor.getFoldLevel(" + str(_line) + ") & FOLDLEVEL.HEADERFLAG = " + str(editor.getFoldLevel(_line) & FOLDLEVEL.HEADERFLAG)
        if editor.getFoldLevel(_line) & FOLDLEVEL.HEADERFLAG:
            editor.foldLine(_line,0)
    
    for match in find_from_to_line_identifiers():
        start_line, end_line = map(lambda x: int(x)-1, editor.getTextRange(*match).split(','))
        while True:
            if start_line <= end_line:
                if editor.getFoldLevel(start_line) & FOLDLEVEL.HEADERFLAG:
                    editor.foldLine(start_line,0)
                    start_line = editor.getLastChild(start_line,-1) + 1
                else:
                    start_line += 1
            else:
                break 

should_be_folded = True
def callback_FOLD_BUFFERACTIVATED(args):
    global should_be_folded
    _state = editor.getProperty('AUTO_FOLDED')
    if _state == '':
        filename, extension = os.path.splitext(notepad.getBufferFilename(args['bufferID']))
        if extension in FILE_EXTENSION_LIST:
            editor.setProperty('AUTO_FOLDED', '1')
            should_be_folded = True
        else:
            editor.setProperty('AUTO_FOLDED', '-1')
            should_be_folded = False
    else:
        should_be_folded = False

def callback_FOLD_UPDATEUI(args):
    global should_be_folded
    if should_be_folded:
        scan(editor.getLineCount())
        should_be_folded = False

notepad.callback(callback_FOLD_BUFFERACTIVATED, [NOTIFICATION.BUFFERACTIVATED])
editor.callback(callback_FOLD_UPDATEUI, [SCINTILLANOTIFICATION.UPDATEUI])
'''
