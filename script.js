var scene = new THREE.Scene();
var clock = new THREE.Clock();
var loader = new THREE.GLTFLoader();

// Create a camera and position it
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,-9);
		// Create a renderer and add it to the DOM
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas")});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
var currentColor = 0xffffff;
renderer.setClearColor(currentColor);
renderer.antialias = true;

function bases(posX, posY , posZ , color, sizeX , sizeY , sizeZ){
    var material = new THREE.MeshBasicMaterial({color:color});
    var geometry = new THREE.BoxGeometry(sizeX,sizeY,sizeZ);
    var base= new THREE.Mesh(geometry,material);
    base.position.set(posX,posY,posZ);    
    return base; 
  }
  
  
  
  function nodes(posX, posY ,posZ , color , radius , widthSegment , heightSegment){
    var material = new THREE.MeshBasicMaterial({color:color});
    var geometry = new THREE.SphereGeometry(radius,widthSegment,heightSegment);
    var point = new THREE.Mesh(geometry , material);
    point.position.set(posX,posY,posZ);
    return point;
  }
  
  function arms(posX ,posY ,posZ , color ,radiusTop ,radiusBottom ,height ,radialSegment){
   var material = new THREE.MeshStandardMaterial({color:color});
   var geometry = new THREE.CylinderGeometry(radiusTop,radiusBottom,height,radialSegment);
   var arm = new THREE.Mesh( geometry, material );
   arm.position.set(posX,posY,posZ);
   return arm;
  }
  
  
  
  
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('robot2.jpg');
  scene.background = texture;
  
  
  
  var loader1 = new THREE.GLTFLoader();
  var loader2 = new THREE.GLTFLoader();
  loader1.load(
  'goodRobo.glb',
  function (gltf) {
  var model = gltf.scene;
  model.scale.x = 0.3;
  model.scale.y = 0.3;
  model.scale.z = 0.3;
  model.position.y = -4;
  model.rotation.x = 3;
  scene.add(model);
  },
  undefined,
  function (error) {
  }
  );
  
  loader2.load(
  'newFace.glb',
  function (gltf) {
  var model = gltf.scene;
  model.scale.x = 0.3;
  model.scale.y = 0.3;
  model.scale.z = 0.3;
  model.position.y = 1.5;
  model.position.z = -1;
  model.rotation.x = 2;
  scene.add(model);
  },
  undefined,
  function (error) {
  }
  );
  
  ////////////////////////   Main login ///////////////////////////
  
  // robo structure
  //var upperBase = bases(0,3.5,0,'#71797E',2,0.2,2);
  var  lowerBase = bases(0,-4,0,'#70797E',4,0.2,4);
  var upperBase = nodes(0,3.5,0,'#71797E',1,32,16);
  var stomach = arms(0,1,0,'#71797F',0.7,0.7,2,16);
  var ghaghara = arms(0,-1,0,'#71977E',0.7,2,3,16);
  var body = arms(0,0,0,'#71797E',0.2,0.2,7,16);
  scene.add(lowerBase)
  //scene.add(body, upperBase ,lowerBase ,stomach, ghaghara );
  
  
  
  // arms and nodes
  // shoulder joint
  var s_node = nodes(1.5,1.5,0,'#71797E',0.3,32,16);
  var s_node_1 = nodes(-1.5,1.5,0,'#71797E',0.3,32,16);
  // elbow joint
  var el_node = nodes(0,1,0,'#71797E',0.3,32,16);
  var el_node_1 = nodes(0,1,0,'#71797E',0.3,32,16);
  // hand joint 
  var h_node = nodes(0,2,0,'#71797E',0.3,32,16);
  var h_node_1 = nodes(0,2,0,'#71797E',0.3,32,16);
  // shoulder arm
  var s_arm = arms(0,1,0,'#71797E',0.2,0.2,2,16);
  var s_arm_1 = arms(0,1,0,'#71797E',0.2,0.2,2,16);
  // elbow arm
  var el_arm = arms(0,1,0,'#71797E',0.2,0.2,2,16);
  var el_arm_1 = arms(0,1,0,'#71797E',0.2,0.2,2,16);
  
  scene.add(s_node_1, s_arm_1, el_node_1, el_arm_1 , h_node_1);
  scene.add( s_node,s_arm,el_node, el_arm, h_node);
  
  
  
  
  // connections
  var connection1 = new THREE.Object3D();
  var connection2 = new THREE.Object3D();
  var connection3 = new THREE.Object3D();
  
  //  connection for first hand
  // connection 2
  s_node.add(connection1); 
  connection1.add(s_arm);
  //connection 3
  s_arm.add(connection2); 
  connection2.add(el_node);
  //connection 4
  el_node.add(connection3); 
  connection3.add(el_arm);
  
  // extra connection
  connection3.add(h_node);
  
  
  
  // connections for second hand
  var connection4 = new THREE.Object3D();
  var connection5= new THREE.Object3D();
  var connection6 = new THREE.Object3D();
  
  // add connection
  // connection 5
  s_node_1.add(connection4); 
  connection4.add(s_arm_1);
  //connection 6
  s_arm_1.add(connection5); 
  connection5.add(el_node_1);
  //connection 7
  el_node_1.add(connection6); 
  connection6.add(el_arm_1);
  // extra connection
  connection6.add(h_node_1);
  
  
  
  
  // Light
  var light1 = new THREE.DirectionalLight(0xffffff, 1.0);
  var light2 = new THREE.AmbientLight(0xffffff, 0.5);
  var light3 = new THREE.PointLight(0xffffff, 1);
  light3.position.set(0, 10,-10);
  light1.position.set(10, 10, 10);
  light1.target = upperBase;
  scene.add(light1,light2,light3);
  
  
  // Options 
  var options = {
  connection1: 0,
  connection3: 0,
  connection4: 0,
  connection6: 0,
  s_node: 0,
  s_node_1: 0
  };
  
  
  // connection 3
  let spacePressed = false;
  let index = 0;
  
  var axisOption = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0,0,1),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(0, 1, 0),
  ];
  
  var handMovment = [
  'x direction', 
  'z direction',
  '-z direction',
  'y direction',
  ]
  var rotationAxis = axisOption[0];  
  var rotationAngle = options.connection3 * Math.PI / 180; 
  
  document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
  spacePressed = false;
  index = (index + 1)   %  axisOption.length;
  const newhandMovment = handMovment[index];
  window.alert(newhandMovment);
  rotationAxis = axisOption[index]; 
  }
  });
  
  // for second hand
  
  let index1 = 0;
  
  
  var axisOption1 = [
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0,0,-1),
  ];
  
  var handMovment1 = [
  'x direction',
  'z direction',
  '-z direction',
  'y direction',
  ]
  
  
  var rotationAxis2 = axisOption1[1];
  var rotationAngle2 = options.connection6* Math.PI / 180;
  
  document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
  spacePressed = false;
  index1 = (index1 + 1)   %  axisOption1.length;
  const newhandMovment = handMovment1[index1];
  window.alert(newhandMovment);
  rotationAxis2 = axisOption1[index1]; 
  }
  });
  
  // DAT.GUI 
  var gui = new dat.GUI();
  
  //for right hand
  gui.add(options, 'connection1', 0, 110).listen();
  gui.add(options, 'connection3', 0, 140).onChange(function (value) {
  rotationAngle = value * Math.PI / 180; 
  });
  gui.add(options, 's_node', 140, 210).listen();
  
  //for left hand
  gui.add(options, 'connection4', 90, 200).listen();
  gui.add(options, 'connection6', 0, 140).onChange(function (value) {
  rotationAngle2 = value * Math.PI / 180; 
  });
  gui.add(options, 's_node_1', 0, 50).listen();
  
  
  
  
  
  
  
  
  
  
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    var directionalLightPositions = [      { x: 0, y: -4, z: 0 },      { x: 0, y: 4, z: 0 },      { x: 0, y: -4, z: -2 },      { x: 0, y: 4, z: 2 }    ];
    for (var i = 0; i < directionalLightPositions.length; i++) {
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(
        directionalLightPositions[i].x,
        directionalLightPositions[i].y,
        directionalLightPositions[i].z
      );
      scene.add(directionalLight);
    }
  
  
  
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  controls.maxPolarAngle = Math.PI / 2; 
  
  var isRotationEnabled = true;
  var render = function () {
    requestAnimationFrame(render);
    
    connection1.setRotationFromAxisAngle(axisOption[2], options.connection1*Math.PI / 100);
    connection3.setRotationFromAxisAngle(rotationAxis, rotationAngle);
  
    //for second hand
    connection4.setRotationFromAxisAngle(axisOption1[3], options.connection4*Math.PI / 100);
    connection6.setRotationFromAxisAngle(rotationAxis2, rotationAngle2);
  
    s_node.setRotationFromAxisAngle(axisOption[3], options.s_node*Math.PI / 100);
    s_node_1.setRotationFromAxisAngle(axisOption1[0], options.s_node_1*Math.PI / 100);
  
    if (isRotationEnabled) {
      el_node.rotation.z +=  0.1;
      el_node_1.rotation.z -=  0.1;
    }
  
    controls.update();
    renderer.render(scene, camera);
  };
  
  document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
      isRotationEnabled = !isRotationEnabled;
    }
  });
  
  render();