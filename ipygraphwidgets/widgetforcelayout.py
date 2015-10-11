from ipywidgets import widgets
from traitlets import Unicode, Dict, Int, List
from IPython.display import display, Javascript


# def publish_js():
#     """ I am following the same scheme as 
#     https://github.com/jdfreder/ipython-d3/
#     """
#     import os
#     directory = os.path.dirname(os.path.realpath(__file__))

#     with open(os.path.join(directory, 'widgetforcelayout.js'), 'r') as f:
#         display(Javascript(data=f.read()))


class GraphWidget(widgets.DOMWidget):
    _view_name = Unicode('GraphView', sync=True)
    value = Dict(default_value={'links':[], 'nodes':[]}, sync=True)
    description = Unicode(default_value='Graph View', sync=True)

    width = Int(default_value=600, sync=True)
    height = Int(default_value=600, sync=True)
    charge = Int(default_value=-90, sync=True)
    link_distance = Int(default_value=100, sync=True)
    color_domain = List(default_value=[], sync=True)

    def __init__(self, *pargs, **kwargs):
        widgets.DOMWidget.__init__(self, *pargs, **kwargs)
        self._handlers = widgets.CallbackDispatcher()
        self.on_msg(self._handle_my_msg)

    def _ipython_display_(self, *pargs, **kwargs):
        widgets.DOMWidget._ipython_display_(self, *pargs, **kwargs)

    def _handle_my_msg(self, _, content):
#         """handle a message from the frontent"""
#         self.content = content
        if content.get('event', '') == 'mouseover':
            self._handlers(self)

#     def on_mouseover(self, callback):
#         """Register a callback at mouseover"""
#         self._handlers.register_callback(callback)
    
    def set_graph(self, graph, node_attributes=None):
        from networkx.readwrite import json_graph
        from pprint import pprint
        
        new_value = json_graph.node_link_data(graph)
        # for n in new_value['nodes']:
        #     for attr in node_attributes or []:
        #         if attr in graph.node[n['id']]:
        #             n[attr] = graph.node[n['id']][attr]
        # pprint(new_value)
        self.value = new_value