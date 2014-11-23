def nbinstall(overwrite=False):
    """
    """
    # Lazy imports so we don't pollute the namespace.
    import os
    from IPython.html.nbextensions import install_nbextension
    sigmajs_path = os.path.join(
        os.path.dirname(__file__),
        'sigmajs',
    )
    install_nbextension(
        sigmajs_path,
        overwrite=overwrite,
        symlink=False,
        verbose=0,
    )


def main():
    nbinstall(overwrite=True)

if __name__ == '__main__':
    main()