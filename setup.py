# -*- coding: utf-8 -*-
from setuptools import setup

try:
    from jupyterpip import cmdclass
except:
    import pip, importlib
    pip.main(['install', 'jupyter-pip']); cmdclass = importlib.import_module('jupyterpip').cmdclass

setup(
    name='ipygraphwidgets',
    packages=['ipygraphwidgets'],
    # ... more setup.py stuff here ...
    install_requires=["jupyter-pip"],
    #cmdclass=cmdclass('ipygraphwidgets', 'ipygraphwidgets/init'),
    cmdclass=cmdclass('ipygraphwidgets'),
)

