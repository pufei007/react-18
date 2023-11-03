### Map 是什么

是 OpenLayers 的核心组件。用于初始化地图对象。
初始化地图(Map)，需要一个视图(view)、一个或多个图层( layer)，和一个地图加载的目标 HTML 标签(target)。

参数

controls 添加到地图上的控件。默认加载 ol/control 下 defaults，默认控件组。
pixelRatio 设备上物理像素与设备无关像素（下降）之间的比率。
interactions 添加到地图的交互事件。默认加载 ol/interaction 下 defaults，默认交互组。
keyboardEventTarget 监听键盘事件的元素。这决定了 KeyboardPan 和  KeyboardZoom 互动的触发时间。例如，如果将此选项设置为  document 键盘，则交互将始终触发。如果未指定此选项，则库在其上侦听键盘事件的元素是地图目标（即，用户为地图提供的 div）。如果不是  document，则需要重点关注目标元素以发出关键事件，这要求目标元素具有 tabindex 属性。
layers 图层。没定义图层，也会加载，显示空白图层。图层是按顺序加载的，想要在最上层需要放在最后面。
maxTilesLoading 同时加载的最大瓦片数。默认 16。
moveTolerance 光标必须移动的最小距离（以像素为单位）才能被检测为地图移动事件，而不是单击。增大此值可以使单击地图更容易。
overlays 覆盖物。默认情况下，不添加任何覆盖物。
target 地图的容器，元素本身或 id 元素的 。必须指定，不指定无法加载地图。
view 视图。需要在构造时或通过方法（setView）指定，否则不会加载图层。

Map 的常见属性

layerGroup 地图中图层的图层组。
size DOM 中地图的大小（以像素为单位）。
target 地图的容器。
view 视图。
control 控制地图的控件组。
interaction 交互事件组。

Map 的常用方法

addControl(control) 添加控件。
addInteraction(interaction) 添加交互。
addLayer(layer) 添加图层。
addOverlay(overlay) 添加覆盖物。
dispatchEvent(event) 调度事件并调用所有侦听此类型事件的侦听器。
on(type, listener) 侦听某种类型的事件。
getOverlays() 获取所有覆盖物。
removeOverlay(overlay) 删除指定覆盖物

总结

在 OpenLayers 开发中，Map 代表地图实例。我们可以用它来管理图层的展示，是否添加控件加入地图中等。总之就是后续的图层开发都需要使用它来管理。

### View 是什么

表示地图的简单 2D 视图。简单理解就是用来控制地图在容器中移动，方法的。
主要用于更改地图的中心、分辨率和旋转的对象。
视图具有 projection。投影决定了中心的坐标系，其单位决定了分辨率的单位（每像素的投影单位）。默认投影是球面墨卡托 (EPSG:3857)。
需要注意的是，在构造函数中添加了约束后，在使用方法设置或者获取数据都是在约束内的。

常用参数

center 视图的初始中心。
constrainRotation 旋转约束。 false 意味着没有约束。true 意味着没有约束，但在零附近捕捉到零。数字将旋转限制为该数量的值，就是设置 90 只能旋转 90 度。
enableRotation 是否启用旋转。
extent 限制视图的范围。值表示范围的数字数组：[minx, miny, maxx, maxy]。
constrainOnlyCenter 如果为 true，则范围约束将仅适用于视图中心而不是整个范围。
smoothExtentConstraint 如果为 true，范围约束将被平滑地应用，即允许视图稍微超出给定的 extent。
maxResolution 用于确定分辨率约束的最大分辨率。
minResolution 用于确定分辨率约束的最小分辨率。
maxZoom 用于确定分辨率约束的最大缩放级别。
minZoom 用于确定分辨率约束的最小缩放级别。
constrainResolution 如果为 true，则视图将始终在交互后以最接近的缩放级别进行动画处理；false 表示允许中间缩放级别。
resolutions 决定缩放级别的分辨率。
zoom 仅在 resolution 未定义时使用。缩放级别用于计算视图的初始分辨率。
rotation 以弧度为单位的视图初始旋转（顺时针旋转，0 表示北）。

View 常见的方法

getCenter  获取视图中心，返回一个地图中心的坐标。
getZoom  获取当前的缩放级别。如果视图不限制分辨率，或者正在进行交互或动画，则此方法可能返回非整数缩放级别。
getMaxZoom  获取视图的最大缩放级别。
getMinZoom  获取视图的最小缩放级别。
getProjection  获取地图使用的”投影坐标系统”，如 EPSG:4326；
getMaxResolution  获取视图的最大分辨率。
getMinResolution  获取视图的最低分辨率
getRotation  获取视图旋转。
getZoomForResolution  获取分辨率的缩放级别。
setCenter 设置当前视图的中心。任何范围限制都将适用。
setConstrainResolution 设置视图是否应允许中间缩放级别。
setZoom 缩放到特定的缩放级别。任何分辨率限制都将适用。
setMaxZoom 为视图设置新的最大缩放级别。
setMinZoom 为视图设置新的最小缩放级别。
setRotation  设置该视图的旋转角度。任何旋转约束都将适用。

### Source(源)是什么

数据来源和格式。简单理解就是在使用 layers(图层)时，不同的图层需要传入不同的数据类型，才能渲染地图。它们需要的数据格式都是通过 Source 定义好的，我们只需要把现有的数据，按照规定传入数据源中，就不需要关心其他操作。

Source(源)的一些数据类型

ol.source.BingMaps Bing 地图图块数据的图层源。
ol.source.CartoDB CartoDB Maps API 的图层源。
ol.source.Cluster 聚簇矢量数据。
ol.source.Vector 提供矢量图层数据。
ol.source.Image 提供单一图片数据的类型。
ol.source.ImageCanvas 数据来源是一个 canvas 元素，其中的数据是图片。
ol.source.ImageMapGuide Mapguide 服务器提供的图片地图数据。
ol.source.ImageStatic 提供单一的静态图片地图。
ol.source.ImageVector 数据来源是一个 canvas 元素，但是其中的数据是矢量来源。
ol.source.ImageWMS WMS 服务提供的单一的图片数据。
ol.source.MapQuest MapQuest 提供的切片数据。
ol.source.Stamen Stamen(雄蕊) 提供的地图切片数据。
ol.source.Tile 提供被切分为网格切片的图片数据。
ol.source.TileVector 被切分为网格的矢量数据。
ol.source.TileDebug 并不从服务器获取数据。
ol.source.TileImage 提供切分成切片的图片数据。
ol.source.TileUTFGrid TileJSON 格式 的 UTFGrid 交互数据。
ol.source.TileJSON TileJSON 格式的切片数据。
ol.source.TileArcGISRest ArcGIS Rest 服务提供的切片数据。
ol.source.WMTS WMTS 服务提供的切片数据。
ol.source.Zoomify Zoomify 格式的切片数据。
ol.source.OSM OpenStreetMap 提供的切片数据。
ol.source.XYZ 具有在 URL 模板中定义的一组 XYZ 格式的 URL 的切片数据的图层源。

### Layer(层) 是什么

图层就像是含有文字或图形等元素的图片，一张张按顺序叠放在一起，组合起来形成页面的最终效果。Layer 就是创建这一张张图的函数。

Layer 是派生所有图层类型的基类。定义了诸多不同图层类型共用的特征和方法。

要使用 Layer 需要先从 source 接收到的数据，然后添加到 map 中。

常用参数

className 设置图层元素的 CSS 类名称。
extent 图层渲染的边界范围。
zIndex 图层渲染的 z-index。在渲染时，图层将被排序，首先是 Z-index，然后是位置。
source 该层的数据来源。
map 地图实例。
render 将覆盖图层的默认渲染。

常用监听事件

prerender 图层开始渲染之前。
postrender 渲染完成之时。
error 发生任何错误。
change 图层发生修改。

OpenLayers 中的图层类型

Graticule，地图上覆盖的网格标尺图层。
HeatMap，热力图。
Vector，矢量图。
VectorImage，单张的矢量图层。
VectorTile，矢量瓦片图层。
WebGLPoints，WebGL 渲染的海量点图层。
Tile，栅格图层。

### control(控制)是什么

Controls 是用来控制地图的。如通过按钮控制地图大小，在地图 map 上添加修饰等。
在 Openlayers 中多数 Controls 直接可以在地图上添加，比如 Navigation（导航栏）。第二类是需要放在 Div 元素中才能用。第三类需要放置在 panel（面板）中的操作类似于网页 HTML 中 button 按钮，需要点击或绑定才能起作用。最后一类就是自定义类型的。

常用的控件

controldefaults，地图默认包含的控件。
fullscreen，全屏控件，用于全屏幕查看地图。
mouseposition，鼠标位置控件，显示鼠标所在地图位置的坐标，可以自定义投影。
overviewmap，地图全局视图控件（鹰眼图）。
scaleline，比例尺控件。
zoom，地图放控件。
zoomslider，地图缩放滑块刻度控件。

使用控件

实例化地图 map，通过参数 control 传入，不传值默认 controldefaults 中的控件。
也可以利用 map 对象的 addControl()或 addControls()方法在地图上添加 Controls 对象。
需要在默认控件基础上继续添加控件，可以使用 ol.control.defaults().extend([new ol.control.FullScreen()]) 方法传入。

### Interaction(互动)是什么

Interaction 是用来控制地图的。没看错它和控件一样的作用。不过它们的区别是控件触发都是一些可见的 HTML 元素触发，如按钮、链接等；交互功能都是一些设备行为触发，都是不可见的，如鼠标双击、滚轮滑动，手机设备的手指缩放等。
Interaction，是一个虚基类，不负责实例化，交互功能都继承该基类。

常用交互功能

doubleclickzoom ，双击地图进行缩放；
draganddrop ，以“拖文件到地图中”的交互添加图层；
dragbox，拉框，用于划定一个矩形范围，常用于放大地图；
dragpan ，拖拽平移地图；
dragrotateandzoom，拖拽方式进行缩放和旋转地图；
dragrotate ，拖拽方式旋转地图；
dragzoom ，拖拽方式缩放地图；
draw，绘制地理要素功能；
keyboardpan ，键盘方式平移地图；
keyboardzoom ，键盘方式缩放地图；
select，选择要素功能；
modify ，更改要素；
mousewheelzoom ，鼠标滚轮缩放功能；
pinchrotate，手指旋转地图，针对触摸屏；
pinchzoom ，手指进行缩放，针对触摸屏；
pointer ，鼠标的用户自定义事件基类；
snap，鼠标捕捉，当鼠标距离某个要素一定距离之内，自动吸附到要素。

defaults
默认的交互功能，包含多个交互。规定了默认包含在地图中的功能，他们都是继承自  ol.interaction  类。 主要是最为常用的功能，如缩放、平移和旋转地图等。

DragRotate，鼠标拖拽旋转，一般配合一个键盘按键辅助。
DragZoom，鼠标拖拽缩放，一般配合一个键盘按键辅助。
DoubleClickZoom，鼠标或手指双击缩放地图。
PinchRotate，两个手指旋转地图，针对触摸屏。
PinchZoom，两个手指缩放地图，针对触摸屏。
DragPan，鼠标或手指拖拽平移地图。
KeyboardZoom，使用键盘  +  和  -  按键进行缩放。
KeyboardPan，使用键盘方向键平移地图。
MouseWheelZoom，鼠标滚轮缩放地图。

使用交互功能

通过 map 构造参数 interactions 传入，不传值默认 defaults 中的交互。
需要在默认交互基础上继续添加交互，可以使用 ol.interaction.defaults().extend([new ol.control.Draw()])  方法传入。
也可以利用 map 对象的 addInteraction()方法在地图上添加 Interaction 对象。

### Overlay 是什么

让 HTML 元素显示在地图上某个位置。他和控件很像都是在地图上添加可见元素，不同的是，它不是根据屏幕位置固定的，而是与地理坐标相关联，因此平移地图将移动 Overlay。
常用的大致有三类，弹窗、标注、文本信息。每个覆盖物都会生成对应的 HTML 元素，所以我们也可以使用 css 来修改去样式。
overlay 常用属性

id，覆盖物的唯一标识 ，便于 getOverlayById 方法取得相应的 overlay。
element，要添加到覆盖物元素。
offset，偏移量，像素为单位。overlay 相对于放置位置（position）的偏移量，默认值是 [0, 0]，正值分别向右和向下偏移。
position，在地图所在的坐标系框架下，overlay 放置的位置。
positioning，overlay 对于 position 的相对位置，可能的值是'bottom-left'，'bottom-center'，'bottom-right'， 'center-left'，'center-center'，'center-right'，'top-left'， 'top-center'，和'top-right'。
stopEvent，是否应停止事件传播到地图视口。
autoPanAnimation，用于将叠加层平移到视图中的动画选项。此动画仅在 autoPan 启用时使用。可以提供 Aduration 和 easing 来自定义动画。如果 autoPan 作为对象提供，则弃用并忽略。
className，CSS 类名。

overlay 常用事件

change，当引用计数器增加时，触发；
change:element，overlay 对应的 element(元素) 变化时触发；
change:map，overlay 对应的 map 变化时触发；
change:offset，overlay 对应的 offset(抵消) 变化时触发；
change:position，overlay 对应的 position(位置) 变化时触发；
change:positioning，overlay 对应的 positioning(位置) 变化时触发；
propertychange，overlay 对应的属性变化时触发；
绑定方式：

js 复制代码 var overlay = new ol.Overlay({ // 创建 overlay});
// 事件
overlay.on("change:element", function(){ console.log("获取变化"); })

overlay 常用方法

getElement，获取传入的元素节点。
getId，获取 overlay 的 id。
getMap，获取与 overlay 关联的 map 对象。
getOffset，获取 offset 属性。
getPosition，获取 position 属性。
getPositioning，获取 positioning 属性。
setElement, 设置元素节点。
setMap，设置 map 对象。
setOffset，设置 offset。
setPosition，设置 position 属性。
setPositioning，设置 positioning 属性。
