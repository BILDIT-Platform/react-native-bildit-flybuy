#!/bin/sh
set -o pipefail

bash -l -c 'SRCS_DIR='${PODS_TARGET_SRCROOT}/../../Libraries' MODULES_OUTPUT_DIR='${PODS_TARGET_SRCROOT}/../../React/FBReactNativeSpec/FBReactNativeSpec' MODULES_LIBRARY_NAME='FBReactNativeSpec' ${PODS_TARGET_SRCROOT}/../../scripts/generate-specs.sh' 2>&1 | tee "${SCRIPT_OUTPUT_FILE_0}"
    
