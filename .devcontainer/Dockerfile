# Note: You can use any Debian/Ubuntu based image you want. 
FROM mcr.microsoft.com/vscode/devcontainers/base:0-buster

# [Option] Install zsh
ARG INSTALL_ZSH="true"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
# [Option] Enable non-root Docker access in container
ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby CLI instead of the licensed Docker CLI
ARG USE_MOBY="true"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.
ARG USERNAME=automatic
ARG USER_UID=$USER_UID
ARG USER_GID=$USER_GID
COPY library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
    && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
    # Use Docker script from script library to set things up
    && /bin/bash /tmp/library-scripts/docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "/var/run/docker-host.sock" "/var/run/docker.sock" "${USERNAME}" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/


RUN curl -sL https://deb.nodesource.com/setup_15.x | bash - && apt-get install -y nodejs \
    && npm install --global yarn \ 
    && apt-get autoremove -y && apt-get clean -y

USER vscode

ENV MINICONDA_VERSION 4.9.2
ENV CONDA_DIR /home/vscode/miniconda3
ENV PATH=$CONDA_DIR/bin:$PATH

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py39_${MINICONDA_VERSION}-Linux-x86_64.sh -O ~/miniconda.sh \
    && chmod +x ~/miniconda.sh \
    && ~/miniconda.sh -b -p ${CONDA_DIR} \
    && chown -R ${USER_UID}:${USER_GID} ${CONDA_DIR} \
    && rm ~/miniconda.sh

RUN echo ". $CONDA_DIR/etc/profile.d/conda.sh" >> ~/.profile

ARG PROJECT_NAME=$PROJECT_NAME

RUN ["bin/bash", "-c", "conda init zsh \
    && source ~/.zshrc \
    && conda create -n ${PROJECT_NAME} -y python=3.9 \
    && conda config --set auto_activate_base true \
    && conda activate ${PROJECT_NAME} \
    && conda install -y django=3 numpy scipy matplotlib pandas bokeh \
    && conda install -y -c conda-forge djangorestframework django-cors-headers"]

WORKDIR /home/vscode/workspace
# Setting the ENTRYPOINT to docker-init.sh will configure non-root access 
# to the Docker socket. The script will also execute CMD as needed.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>