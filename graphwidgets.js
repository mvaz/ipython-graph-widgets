var s;
require(["//cdnjs.cloudflare.com/ajax/libs/d3/3.4.1/d3.min.js","widgets/js/widget"], function(d3,WidgetManager){

    // var 

    var SigmajsWidgetView = IPython.DOMWidgetView.extend({
        render: function(){
            this.guid = 'graph' + IPython.utils.uuid();
            this.$el.append('<script src="js/sigma.min.js"/>');
            this.$el.append('<script src="js/sigma.layout.forceAtlas2.min.js"/>');
            this.$el.append('<script src="js/sigma.plugins.dragNodes.min.js"/>');


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

            var d = this.model.get('value');

            this.s = new sigma({
                graph: d,
                renderers: [{
                    container: document.getElementById(this.guid),
                    type: sigma.renderers.canvas //', // sigma.renderers.canvas works as well
                }]
            });
            this.s.refresh();
            this.s.startForceAtlas2({slowDown: this.model.get("slowDown")});
            // sigma.plugins.dragNodes(this.s, this.s.renderers[0]);

            // setTimeout(function() {
            //   this.s.stopForceAtlas2();
            // }, 10.0);

            // this.$('.sigma-labels').each(function(i,x){ x.style.position = 'relative'; });
            // this.$('.sigma-scene').each(function(i,x){ x.style.position = 'relative'; });
            // this.$('.sigma-mouse').each(function(i,x){ x.style.position = 'relative'; });
        },

        value_changed: function() {
          var isEmpty = function (val){
            return (val === undefined || val == null || val.length <= 0) ? true : false;
          };
          console.log("value_changed");
          console.log(this.s);
          var new_data = this.model.get("value");
          console.log("new_data", new_data);

          for (var i = new_data.nodes.length - 1; i >= 0; i--) {
            var oldNode;
            oldNode = this.s.graph.nodes(new_data.nodes[i].id);

            if (!isEmpty(oldNode)){
              new_data.nodes[i].x = oldNode.x;
              new_data.nodes[i].y = oldNode.y;
            };
          };
          
          // console.log("++ ", this.s.forceatlas2.isRunning);
          console.log("stop force");
          // this.s.stopForceAtlas2();
          // console.log("++ ", this.s.forceatlas2.isRunning);
          

          this.s.graph.clear();
          this.s.refresh();

          this.s.graph.read(new_data);
          this.s.refresh();

          this.s.startForceAtlas2({slowDown: this.model.get("slowDown")});
          
          
// console.log("new data", "++++ ", this.s.forceatlas2.isRunning);
          // setTimeout(function() {
            // this.s.refresh();
              // this.s.startForceAtlas2({slowDown: 100000});
              // console.log("finished");
              // console.log("** ", this.s.isForceAtlas2Running());
          // }, 1000);
        }
    });

    WidgetManager.register_widget_view('SigmajsWidgetView', SigmajsWidgetView);
});




            // {
            //  'edges': [
            //   {'id': 'e01', 'source': 'n0', 'target': 'n1'},
            //   {'id': 'e02', 'source': 'n0', 'target': 'n2'},
            //   {'id': 'e03', 'source': 'n0', 'target': 'n3'},
            //   {'id': 'e06', 'source': 'n0', 'target': 'n6'},
            //   {'id': 'e08', 'source': 'n0', 'target': 'n8'},
            //   {'id': 'e09', 'source': 'n0', 'target': 'n9'},
            //   {'id': 'e12', 'source': 'n1', 'target': 'n2'},
            //   {'id': 'e13', 'source': 'n1', 'target': 'n3'},
            //   {'id': 'e15', 'source': 'n1', 'target': 'n5'},
            //   {'id': 'e18', 'source': 'n1', 'target': 'n8'},
            //   {'id': 'e19', 'source': 'n1', 'target': 'n9'},
            //   {'id': 'e23', 'source': 'n2', 'target': 'n3'},
            //   {'id': 'e24', 'source': 'n2', 'target': 'n4'},
            //   {'id': 'e29', 'source': 'n2', 'target': 'n9'},
            //   {'id': 'e34', 'source': 'n3', 'target': 'n4'},
            //   {'id': 'e35', 'source': 'n3', 'target': 'n5'},
            //   {'id': 'e45', 'source': 'n4', 'target': 'n5'},
            //   {'id': 'e46', 'source': 'n4', 'target': 'n6'},
            //   {'id': 'e56', 'source': 'n5', 'target': 'n6'},
            //   {'id': 'e57', 'source': 'n5', 'target': 'n7'},
            //   {'id': 'e68', 'source': 'n6', 'target': 'n8'},
            //   {'id': 'e67', 'source': 'n6', 'target': 'n7'},
            //   {'id': 'e78', 'source': 'n7', 'target': 'n8'},
            //   {'id': 'e79', 'source': 'n7', 'target': 'n9'},
            //   {'id': 'e89', 'source': 'n8', 'target': 'n9'}],
            //  'nodes': [{'color': '#c1e4d5',
            //    'id': 'n0',
            //    'size': 1,
            //    'x': 0.3142195603571719,
            //    'y': 0.7597627953276259},
            //   {'color': '#b8e0cf',
            //    'id': 'n1',
            //    'size': 1,
            //    'x': 0.19687066456535562,
            //    'y': 0.911656533911617},
            //   {'color': '#46b779',
            //    'id': 'n2',
            //    'size': 1,
            //    'x': 0.7346903262175539,
            //    'y': 0.4497176768204467},
            //   {'color': '#d6ddf2',
            //    'id': 'n3',
            //    'size': 1,
            //    'x': 0.6509681011724193,
            //    'y': 0.7939470780617669},
            //   {'color': '#f0f5f9',
            //    'id': 'n4',
            //    'size': 1,
            //    'x': 0.34968972608560767,
            //    'y': 0.052230458147380254},
            //   {'color': '#ebf3f6',
            //    'id': 'n5',
            //    'size': 1,
            //    'x': 0.7763268737696849,
            //    'y': 0.29526832953242765},
            //   {'color': '#74c89b',
            //    'id': 'n6',
            //    'size': 1,
            //    'x': 0.964345683130373,
            //    'y': 0.2920570283510353},
            //   {'color': '#67c391',
            //    'id': 'n7',
            //    'size': 1,
            //    'x': 0.29755145984946674,
            //    'y': 0.19167517517104748},
            //   {'color': '#6181c3',
            //    'id': 'n8',
            //    'size': 1,
            //    'x': 0.12847253419763072,
            //    'y': 0.22529639712760818},
            //   {'color': '#eff1fb',
            //    'id': 'n9',
            //    'label': 'lalalal',
            //    'size': 1,
            //    'x': 0.22904247065470362,
            //    'y': 0.6104898579847635}
            //    ]
            // };
