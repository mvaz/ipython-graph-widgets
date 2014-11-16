var s;
require(["//cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js","widgets/js/widget"], function(d3,WidgetManager){

    var SigmajsWidgetView = IPython.DOMWidgetView.extend({
        render: function(){
            this.guid = 'graph' + IPython.utils.uuid();
            this.$el.append('<script src="sigma.min.js"/>');
            this.$el.append('<script src="sigma.layout.forceAtlas2.min.js"/>');

            this.$graph = $('<div />')
                .attr('id', this.guid)
                .attr('class', 'graph')
                .appendTo(this.$el);

            // this.setElement($('<div />', {id: this.guid, 'class': 'graph'}));

            this.$el.css('position', 'relative');

            this.s = {};

            this.model.on('change:value', this.value_changed, this);
            
            // 
            // Wait for element to be added to the DOM            
            var that = this;
            setTimeout(function() {
                that.update();
                that.render_graph();
            }, 0.01);

        },

        update: function() {
            console.log('>> update');
            this.$graph.css('width', this.model.get('width') + 'px');
            this.$graph.css('height', this.model.get('height') + 'px');
        },

        render_graph: function(){

            console.log("render");

            var d = {
             'edges': [
              {'id': 'e01', 'source': 'n0', 'target': 'n1'},
              {'id': 'e02', 'source': 'n0', 'target': 'n2'},
              {'id': 'e03', 'source': 'n0', 'target': 'n3'},
              {'id': 'e06', 'source': 'n0', 'target': 'n6'},
              {'id': 'e08', 'source': 'n0', 'target': 'n8'},
              {'id': 'e09', 'source': 'n0', 'target': 'n9'},
              {'id': 'e12', 'source': 'n1', 'target': 'n2'},
              {'id': 'e13', 'source': 'n1', 'target': 'n3'},
              {'id': 'e15', 'source': 'n1', 'target': 'n5'},
              {'id': 'e18', 'source': 'n1', 'target': 'n8'},
              {'id': 'e19', 'source': 'n1', 'target': 'n9'},
              {'id': 'e23', 'source': 'n2', 'target': 'n3'},
              {'id': 'e24', 'source': 'n2', 'target': 'n4'},
              {'id': 'e29', 'source': 'n2', 'target': 'n9'},
              {'id': 'e34', 'source': 'n3', 'target': 'n4'},
              {'id': 'e35', 'source': 'n3', 'target': 'n5'},
              {'id': 'e45', 'source': 'n4', 'target': 'n5'},
              {'id': 'e46', 'source': 'n4', 'target': 'n6'},
              {'id': 'e56', 'source': 'n5', 'target': 'n6'},
              {'id': 'e57', 'source': 'n5', 'target': 'n7'},
              {'id': 'e68', 'source': 'n6', 'target': 'n8'},
              {'id': 'e67', 'source': 'n6', 'target': 'n7'},
              {'id': 'e78', 'source': 'n7', 'target': 'n8'},
              {'id': 'e79', 'source': 'n7', 'target': 'n9'},
              {'id': 'e89', 'source': 'n8', 'target': 'n9'}],
             'nodes': [{'color': '#c1e4d5',
               'id': 'n0',
               'size': 1,
               'x': 0.3142195603571719,
               'y': 0.7597627953276259},
              {'color': '#b8e0cf',
               'id': 'n1',
               'size': 1,
               'x': 0.19687066456535562,
               'y': 0.911656533911617},
              {'color': '#46b779',
               'id': 'n2',
               'size': 1,
               'x': 0.7346903262175539,
               'y': 0.4497176768204467},
              {'color': '#d6ddf2',
               'id': 'n3',
               'size': 1,
               'x': 0.6509681011724193,
               'y': 0.7939470780617669},
              {'color': '#f0f5f9',
               'id': 'n4',
               'size': 1,
               'x': 0.34968972608560767,
               'y': 0.052230458147380254},
              {'color': '#ebf3f6',
               'id': 'n5',
               'size': 1,
               'x': 0.7763268737696849,
               'y': 0.29526832953242765},
              {'color': '#74c89b',
               'id': 'n6',
               'size': 1,
               'x': 0.964345683130373,
               'y': 0.2920570283510353},
              {'color': '#67c391',
               'id': 'n7',
               'size': 1,
               'x': 0.29755145984946674,
               'y': 0.19167517517104748},
              {'color': '#6181c3',
               'id': 'n8',
               'size': 1,
               'x': 0.12847253419763072,
               'y': 0.22529639712760818},
              {'color': '#eff1fb',
               'id': 'n9',
               'label': 'lalalal',
               'size': 1,
               'x': 0.22904247065470362,
               'y': 0.6104898579847635}
               ]
            };

            this.s = new sigma({
                graph: d,
                renderers: [{
                    container: document.getElementById(this.guid),
                    type: sigma.renderers.canvas //', // sigma.renderers.canvas works as well
                }]
            });
            this.s.refresh();
            this.s.startForceAtlas2();

// console.log('d');

// this.s = new sigma(document.getElementById(this.guid));
// console.log(this.s);

// Then, let's add some data to display:
// this.s.graph.addNode({
//     // Main attributes:
//     id: 'n0',
//     label: 'Hello',
//     // Display attributes:
//     x: 0,
//     y: 0,
//     size: 1,
//     color: '#f00'
// }).addNode({
//     // Main attributes:
//     id: 'n1',
//     label: 'World !',
//     // Display attributes:
//     x: 1,
//     y: 1,
//     size: 1,
//     color: '#00f'
// }).addEdge({
//     id: 'e0',
//     // Reference extremities:
//     source: 'n0',
//     target: 'n1',
//     color: '#0f0'
// });

// console.log('refresh');
// // Finally, let's ask our sigma instance to refresh:
// this.s.refresh();
// this.s.startForceAtlas2();
// sigma-labels
            // this.$('.sigma-labels').each(function(i,x){ x.style.position = 'relative'; });
            // this.$('.sigma-scene').each(function(i,x){ x.style.position = 'relative'; });
            // this.$('.sigma-mouse').each(function(i,x){ x.style.position = 'relative'; });
        },

        value_changed: function() {
            console.log("value_changed");
            // var new_data = this.model.get("value");

            // var that = this;
            setTimeout(function() {
                // this.s.stopForceAtlas2(); // 
                console.log('xxxxx');
            }, 1000);
        }
    });

    WidgetManager.register_widget_view('SigmajsWidgetView', SigmajsWidgetView);
});
