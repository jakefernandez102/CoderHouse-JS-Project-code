const { src, dest, watch, series } = require( 'gulp' );
const imagemin = require( 'gulp-imagemin' );

function imagenes () {

    return src( 'src/img/**/*' )
        .pipe( imagemin( { optimizationLevel: 3 } ) )
        .pipe( dest( 'built/img' ) );

}

function dev ( done ) {

    watch( 'src/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );

    done();
}

exports.imagenes = imagenes;
exports.dev = dev;

exports.default = series( imagenes, dev );