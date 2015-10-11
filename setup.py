# -*- coding: utf-8 -*-
from __future__ import print_function
from setuptools import setup
try:
    from jupyterpip import cmdclass
except:
    import pip, importlib
    pip.main(['install', 'jupyter-pip']); cmdclass = importlib.import_module('jupyterpip').cmdclass

setup(
    name='ipygraphwidgets',
    version='0.1.1',
    description='',
    author='Miguel Vaz',
    author_email='migueljvaz@gmail.com',
    license='MIT',
    url='https://github.com/mvaz/ipython-graph-widgets',
    keywords='python ipython javascript widget d3 graph',
    classifiers=['Development Status :: 4 - Beta',
                 'Programming Language :: Python',
                 'License :: OSI Approved :: MIT License'],
    packages=['ipygraphwidgets'],
    include_package_data=True,
    install_requires=["jupyter-pip"],
    cmdclass=cmdclass('ipygraphwidgets'),
)
