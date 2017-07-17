var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();

var config = {
		source: "./src/",
		dist: "./public"
};
var paths = {
	html: "**/*.html",//** busqueda a partir de la carpeta en que se encuentra
	sass: "assets/scss/**/*.scss", //*busqueda en todo
	mainSass:"assets/scss/main.scss",
  js: "assets/js/*.js",
  img: "assets/img/*.*"
};

var sources = {
	html: config.source + paths.html,
	sass: config.source + paths.sass,
  rootSass: config.source + paths.mainSass,
  js: config.source + paths.js,
  img: config.source + paths.img,
};

gulp.task("mover_html",()=>{
	gulp.src(sources.html)
		.pipe(gulp.dest(config.dist));
});

gulp.task("sass",()=>{
	gulp.src( sources.rootSass )
		.pipe(
			sass({outputStyle: "compressed"}) //paramentro en forma de objeto de sass
				.on("error", sass.logError)  )
		.pipe( gulp.dest( config.dist + "/assets/css") )
});

gulp.task("js", ()=>{
	gulp.src(sources.js)
		.pipe( concat('all.js') )
		.pipe( gulp.dest( "./public/assets/js" ) );
});

gulp.task("img", ()=>{
  gulp.src(sources.img)
  .pipe(gulp.dest(config.dist + "/assets/img"));
});

gulp.task("sass-watch",["sass"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("js-watch",["js"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("html-watch",["mover_html"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("img-watch",["img"], (done)=>{
  browserSync.reload();
	done();
});

/*
Cambiamos el nombre de serve -> default
Al llamarse default basta con correr "gulp" en la terminal y no "gulp serve"
*/
gulp.task("default", ()=>{
	browserSync.init({ //inicia el servid
		server: { //conectar public con mi servidor
			baseDir: "./public"
		}
	});
	gulp.watch(sources.sass, ["sass-watch"] );
	gulp.watch(sources.js, ["js-watch"] );
	gulp.watch("./src/*.html", ["html-watch"] );
  gulp.watch(sources.img, ["img-watch"]); // no se recarga esta tarea
});
