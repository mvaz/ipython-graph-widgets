from IPython.html import widgets
from IPython.utils.traitlets import Unicode, Dict, Int, List
from IPython.display import display, Javascript
import numpy as np
from matplotlib.colors import ColorConverter, rgb2hex
import seaborn as sns


def publish_js():
    """ I am following the same scheme as 
    https://github.com/jdfreder/ipython-d3/
    """
    import os
    directory = os.path.dirname(os.path.realpath(__file__))

    with open(os.path.join(directory,'graphwidgets.js'), 'r') as f:
        display(Javascript(data=f.read()))

class SigmajsWidget(widgets.DOMWidget):
    _view_name = Unicode('SigmajsWidgetView', sync=True)
    value = Dict(default_value={'links':[], 'nodes':[]}, sync=True)

    width = Int(default_value=600, sync=True)
    height = Int(default_value=600, sync=True)

    def set_graph(self, graph):
        from networkx.readwrite import json_graph
        new_value = self.__convert_graph(graph)
        self.value = new_value

    def __convert_graph(self, g):
    	from networkx.readwrite import json_graph
    	new_value = json_graph.node_link_data(g)
    	new_value['edges'] = new_value['links']
        new_value.pop('links', None)
        p = sns.blend_palette(["mediumseagreen", "ghostwhite", "#4168B7"], 9, as_cmap=True)
        for n in new_value['nodes']:
            n['x'] = np.random.random()
            n['y'] = np.random.random()
            n['color'] = rgb2hex( p( np.random.random()) ).decode("ascii")
            n['size'] = 1
            n['id'] = "n%d"% n['id']

        for e in new_value["edges"]:
        	e['id'] = 'e%d%d'  % (e['source'], e['target'])
        	e['source'] = "n%d"% e['source']
        	e['target'] = "n%d"% e['target']

        return dict(filter(lambda x: x[0] in ['nodes', 'edges'], new_value.iteritems()))

