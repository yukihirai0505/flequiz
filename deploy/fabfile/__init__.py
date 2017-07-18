# -*- coding: utf-8 -*-
from fabric.api import *
from fabric.decorators import runs_once
from datetime import datetime

env.hosts = ['your ip']
env.user = 'ec2-user'
env.key_filename = 'your ssh key'
env.project_root = '../api'
env.branch = 'master'
env.archive = ''
env.server_api_dir = '~/api'
env.project_web_root = '../web'
env.web_archive = ''
env.server_web_dir = '~/web'

@task
@runs_once
def build_api():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    env.archive = "api-%(timestamp)s.tar.gz" % {"timestamp":timestamp}
    with lcd(env.project_root):
         local("/usr/local/bin/sbt clean assembly")
         local("tar cvfz %(archive)s api-standalone.jar" % {"archive":env.archive})
         put("%(archive)s" % {"archive":env.archive}, "%(dir)s/" % {"dir" : env.server_api_dir})
         put("./src/main/resources/application_prod.conf", "%(dir)s/" % {"dir" : env.server_api_dir})
    run("sudo rm -Rf %(dir)s/api-standalone.jar" % {"dir" : env.server_api_dir})
    run("tar zxvf %(dir)s/%(archive)s -C %(dir)s" % {"dir" : env.server_api_dir, "archive":env.archive})

@task
def api_start():
    run('sudo supervisorctl start api')

@task
def api_stop():
    run('sudo supervisorctl stop api')

@task
def api_restart():
    execute(api_start)
    execute(api_stop)

@task
@runs_once
def deploy_api(branch=env.branch):
    execute(build_api)
    execute(api_stop)
    execute(api_start)

@task
@runs_once
def deploy_web():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    env.web_archive = "web-%(timestamp)s.tar.gz" % {"timestamp":timestamp}
    with lcd(env.project_web_root):
         local("/usr/local/bin/npm run build")
         local("sed -ie 's/\.\/static\/js/\/static\/js/g' build/index.html")
         local("tar cvfz %(archive)s build" % {"archive":env.web_archive})
         put("%(archive)s" % {"archive":env.web_archive}, "%(dir)s/" % {"dir" : env.server_web_dir})
    run("sudo rm -Rf %(dir)s/build" % {"dir" : env.server_web_dir})
    run("tar zxvf %(dir)s/%(archive)s -C %(dir)s" % {"dir" : env.server_web_dir, "archive":env.web_archive})

@task
@runs_once
def deploy_all(branch=env.branch):
    execute(deploy_api)
    execute(deploy_web)
